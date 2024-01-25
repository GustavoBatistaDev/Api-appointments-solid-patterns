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

const verifyLoggedUserMiddleware = new VerifyLoggedUserMiddleware(
  decodeTokenService,
  getUserByIdService,
);

authRouter.get(
  "/profile",
  verifyLoggedUserMiddleware.verifyLoggedUser,

  async (req: Request, res: Response) => {
    return res.send("profile");
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

export default authRouter;
