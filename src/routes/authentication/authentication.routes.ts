// routes.ts

import express from "express";
import { CreateUserValidatorMiddleware } from "../../middlewares/authentication/createUserValidate.middleware";
import { registerSchema } from "../../schemas/authentication/register.schema";
import { CreateUserController } from "../../controllers/authentication/createUser.controller";
import { CreateUserService } from "../../services/authentication/createUser.service";
import { CreateUserRepository } from "../../repositories/authentication/createUser.repository";
import { GetUserService } from "../../services/authentication/getUsers.service";
import {
  GetUserByIdRepository,
  GetUserRepository,
} from "../../repositories/authentication/getUsers.repository";
import { EncryptorPasswordService } from "../../services/authentication/encryptorPassword.service";

import { Request, Response } from "express";
import { CreateTokenJwtService } from "../../services/authentication/createTokenJwt.service";
import { TwoStepVerificationController } from "../../controllers/authentication/twoStepVerification.controller";
import { DecodeTokenService } from "../../services/authentication/decodeToken.service";

import { ActivateUserService } from "../../services/authentication/activateUser.service";
import { ActivateUserRepository } from "../../repositories/authentication/activateUser.repository";
import { LoginUserRepository } from "../../repositories/authentication/loginUser.repository";
import { LoginUserService } from "../../services/authentication/loginUser.service";
import { LoginUserController } from "../../controllers/authentication/loginUser.controller";
import { LoginUserValidatorMiddleware } from "../../middlewares/authentication/loginUserValidate.middleware";
import { loginSchema } from "../../schemas/authentication/login.schema";
import { VerifyLoggedUserMiddleware } from "../../middlewares/authentication/verifyLoggedUser.middleware";
import { GetUserByIdService } from "../../services/global/getUserById.service";
import { ValidateEmailChangePasswordMiddleware } from "../../middlewares/authentication/validateEmailRecoverPassword.middleware";
import { recoverPasswordSchema } from "../../schemas/authentication/email.schema";
import { ChangePassworController } from "../../controllers/authentication/changePassword.controller";
import { ValidateAlterPasswordMiddleware } from "../../middlewares/authentication/validateAlterPassword.middleware";
import { UpdatePasswordService } from "../../services/authentication/updatePassword.service";
import { UpdatePasswordRepository } from "../../repositories/authentication/updatePassword.repository";
import { AlterPassworController } from "../../controllers/authentication/alterPassword.controller";
import { ValidateUpdateProfileMiddleware } from "../../middlewares/users/validadeUpdateProfile.middleware";
import { profileSchema } from "../../schemas/authentication/profile.schema";
import { UpdateUserRepository } from "../../repositories/users/updateUser.repository";
import { UpdateUserService } from "../../services/users/updateUser.service";
import { UpdateProfileController } from "../../controllers/users/updateProfile.controller";
import { CreateAppointmentValidatorMiddleware } from "../../middlewares/appointments/validateAppointment.middleware";
import { appointmentSchema } from "../../schemas/authentication/scheduling.schema";
import { CreateAppointmentController } from "../../controllers/appointments/createAppointment.controller";
import { CreateAppointmentService } from "../../services/appointments/createAppointment.service";
import { CreateAppointmentRepository } from "../../repositories/appointments/createAppointment.repository";
import { GetDoctorBySpecialtyService } from "../../services/appointments/getDoctorsBySpecialty.service";
import { GetDoctorBySpecialtyRepository } from "../../repositories/appointments/getDoctorsBySpecialty.repository";
import { GetAppointmentsService } from "../../services/appointments/getAppointments.services";
import { GetAppointmentsRepository } from "../../repositories/appointments/getAppointments.repository";
import { ValidateProfileCompletedMiddleware } from "../../middlewares/users/validateProfileCompleted.middleware";

const authRouter = express.Router();

const getUserRepository = new GetUserRepository();

const getUserService = new GetUserService(getUserRepository);

const createUserValidatorMiddleware = new CreateUserValidatorMiddleware(
  registerSchema,
  getUserService,
);

const encryptorPasswordService = new EncryptorPasswordService();

const createTokenJwt = new CreateTokenJwtService();

authRouter.post(
  "/user",
  createUserValidatorMiddleware.validateDataCreateUser,
  createUserValidatorMiddleware.validateEmailAndCpfExistsInDB,
  async (req: Request, res: Response) => {
    const createUserRepository = new CreateUserRepository();
    const createUserService = new CreateUserService(
      createUserRepository,
      encryptorPasswordService,
    );
    const createUserController = new CreateUserController(createUserService);

    const { body, statusCode } = await createUserController.handle(req, res);

    return res.status(statusCode).json(body);
  },
);

// Verificação de duas etapas

authRouter.get("/verify-email", async (req: Request, res: Response) => {
  const decodeTokenService = new DecodeTokenService();

  const activateUserRepository = new ActivateUserRepository();
  const activateUserService = new ActivateUserService(activateUserRepository);

  const twoStepVerificationController = new TwoStepVerificationController(
    decodeTokenService,
    activateUserService,
  );
  const { statusCode, body } = await twoStepVerificationController.handle(
    req,
    res,
  );

  return res.status(statusCode).json(body);
});

// Login
const loginUserRepository = new LoginUserRepository();

const loginUserService = new LoginUserService(
  loginUserRepository,
  createTokenJwt,
);
const loginUserValidatorMiddleware = new LoginUserValidatorMiddleware(
  loginUserService,
  loginSchema,
);

authRouter.post(
  "/login",
  loginUserValidatorMiddleware.validateDataLoginUser,
  async (req: Request, res: Response) => {
    const loginUserController = new LoginUserController(loginUserService);
    const { body, statusCode } = await loginUserController.handle(req);
    return res.status(statusCode).json(body);
  },
);

// Profile

const decodeTokenService = new DecodeTokenService();

const getUserByIdRepository = new GetUserByIdRepository();

const getUserByIdService = new GetUserByIdService(getUserByIdRepository);

const validateUpdateProfile = new ValidateUpdateProfileMiddleware(
  profileSchema,
);

const verifyLoggedUserMiddleware = new VerifyLoggedUserMiddleware(
  decodeTokenService,
  getUserByIdService,
);

authRouter.put(
  "/profile",
  verifyLoggedUserMiddleware.verifyLoggedUser,
  validateUpdateProfile.validateUpdateProfile,

  async (req: Request, res: Response) => {
    const updateUserRepository = new UpdateUserRepository();
    const updateUserService = new UpdateUserService(updateUserRepository);
    const updateProfileController = new UpdateProfileController(
      updateUserService,
    );
    const { statusCode, body } = await updateProfileController.handle(req, res);
    return res.status(statusCode).json(body);
  },
);

// change password

const validateEmailChangePasswordMiddleware =
  new ValidateEmailChangePasswordMiddleware(
    recoverPasswordSchema,
    getUserService,
  );

authRouter.post(
  "/change-password",
  validateEmailChangePasswordMiddleware.validateEmailRecoverPassword,
  async (req: Request, res: Response) => {
    const changePasswordController = new ChangePassworController(
      getUserService,
    );
    const { statusCode, body } = await changePasswordController.handle(
      req,
      res,
    );
    return res.status(statusCode).json(body);
  },
);

// alter password

const validateAlterPasswordMiddleware = new ValidateAlterPasswordMiddleware(
  getUserByIdService,
  decodeTokenService,
);

authRouter.post(
  "/alter-password/:token",
  validateAlterPasswordMiddleware.validateEmailRecoverPassword,
  validateAlterPasswordMiddleware.validatePasswords,

  async (req, res) => {
    const updatePasswordRepository = new UpdatePasswordRepository();
    const updatePasswordService = new UpdatePasswordService(
      updatePasswordRepository,
    );

    const encryptorPassword = new EncryptorPasswordService();

    const alterPassworController = new AlterPassworController(
      updatePasswordService,
      encryptorPassword,
    );

    const { statusCode, body } = await alterPassworController.handle(req, res);
    return res.status(statusCode).json(body);
  },
);

// Appointments

const getAppointmentsRepository = new GetAppointmentsRepository();
const getAppointmentsService = new GetAppointmentsService(
  getAppointmentsRepository,
);

const getDoctorBySpecialtyRepository = new GetDoctorBySpecialtyRepository();
const getDoctorBySpecialtyService = new GetDoctorBySpecialtyService(
  getDoctorBySpecialtyRepository,
);

const createAppointmentValidatorMiddleware =
  new CreateAppointmentValidatorMiddleware(
    appointmentSchema,
    getAppointmentsService,
    getDoctorBySpecialtyService,
  );

const getUserByIdRepositoryProfile = new GetUserByIdRepository();
const getUserByIdServiceProfile = new GetUserByIdService(
  getUserByIdRepositoryProfile,
);

const decodeTokenServiceProfile = new DecodeTokenService();
const validateProfileCompletedMiddleware =
  new ValidateProfileCompletedMiddleware(
    decodeTokenServiceProfile,
    getUserByIdServiceProfile,
  );

authRouter.post(
  "/agendamentos",
  verifyLoggedUserMiddleware.verifyLoggedUser,
  validateProfileCompletedMiddleware.validateUpdateProfile,
  createAppointmentValidatorMiddleware.validateDataCreateAppointment,
  async (req: Request, res: Response) => {
    const createAppointmentRepository = new CreateAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      createAppointmentRepository,
    );

    const getDoctorsBySpecialtyRepository =
      new GetDoctorBySpecialtyRepository();
    const getDoctorsBySpecialtyService = new GetDoctorBySpecialtyService(
      getDoctorsBySpecialtyRepository,
    );

    const getAppointmentsRepository = new GetAppointmentsRepository();

    const getAppointmentService = new GetAppointmentsService(
      getAppointmentsRepository,
    );

    const createAppointmentController = new CreateAppointmentController(
      createAppointmentService,
      getDoctorsBySpecialtyService,
      getAppointmentService,
    );

    const { statusCode, body } = await createAppointmentController.handle(
      req,
      res,
    );
    return res.status(statusCode).json(body);
  },
);

export default authRouter;
