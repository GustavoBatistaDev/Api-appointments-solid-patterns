// routes.ts

import express from "express";
import { CreateUserValidatorMiddleware } from "../../middlewares/authentication/createUserValidate.middleware";
import { userSchema } from "../../schemas/authentication/user.schema";
import { CreateUserController } from "../../controllers/authentication/createUser.controller";
import { CreateUserService } from "../../services/authentication/createUser.service";
import { CreateUserRepository } from "../../repositories/authentication/createUser.repository";
import { GetUserService } from "../../services/authentication/getUsers.service";
import { GetUserRepository } from "../../repositories/authentication/getUsers.repository";
import { EncryptorPasswordService } from "../../services/authentication/encryptorPassword.service";
import { SendMailService } from "../../services/global/sendMail.service";
import { Request, Response } from "express";
import { CreateTokenJwtService } from "../../services/authentication/createTokenJwt.service";
import { TwoStepVerificationController } from "../../controllers/authentication/twoStepVerification.controller";
import { DecodeTokenService } from "../../services/authentication/decodeToken.service";

import { ActivateUserService } from "../../services/authentication/activateUser.service";
import { ActivateUserRepository } from "../../repositories/authentication/activateUser.repository";
import { LoginUserRepository } from "../../repositories/authentication/loginUser.repository";
import { LoginUserService } from "../../services/authentication/loginUser.service";
import { LoginUserController } from "../../controllers/authentication/loginUser.controller";
import { ComparePasswordService } from "../../services/authentication/comparePassword.service";

const authRouter = express.Router();

const getUserRepository = new GetUserRepository();

const getUserService = new GetUserService(getUserRepository);

const createUserValidatorMiddleware = new CreateUserValidatorMiddleware(
  userSchema,
  getUserService,
);

const sendMail = new SendMailService();

const encryptorPasswordService = new EncryptorPasswordService();

const createTokenJwt = new CreateTokenJwtService();

authRouter.post(
  "/user/api",
  createUserValidatorMiddleware.validateDataCreateUser,
  createUserValidatorMiddleware.validateEmailAndCpfExistsInDB,
  async (req: Request, res: Response) => {
    const createUserRepository = new CreateUserRepository();
    const createUserService = new CreateUserService(
      createUserRepository,
      encryptorPasswordService,
    );
    const createUserController = new CreateUserController(
      createUserService,
      sendMail,
      createTokenJwt,
    );

    const { body, statusCode } = await createUserController.handle(req);

    return res.status(statusCode).json(body);
  },
);

authRouter.get("/verify-email", async (req: Request, res: Response) => {
  const decodeTokenService = new DecodeTokenService();

  const activateUserRepository = new ActivateUserRepository();
  const activateUserService = new ActivateUserService(activateUserRepository);

  const twoStepVerificationController = new TwoStepVerificationController(
    decodeTokenService,
    activateUserService,
  );
  const { statusCode, body } = await twoStepVerificationController.handle(req);

  return res.status(statusCode).json(body);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const loginUserRepository = new LoginUserRepository();
  const createTokenJwt = new CreateTokenJwtService();
  const loginUserService = new LoginUserService(
    loginUserRepository,
    createTokenJwt,
  );
  const comparePassword = new ComparePasswordService();
  const loginUserController = new LoginUserController(
    loginUserService,
    comparePassword,
  );
  const { body, statusCode } = await loginUserController.handle(req);
  return res.status(statusCode).json(body);
});

export default authRouter;
