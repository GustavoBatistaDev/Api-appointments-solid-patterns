// routes.ts

import express from "express";
import { CreateUserValidatorMiddleware } from "../../middlewares/authentication/createUserValidate.middleware";
import { userSchema } from "../../schemas/authentication/user.schema";
import { CreateUserController } from "../../controllers/authentication/createUser.controller";
import { CreateUserService } from "../../services/authentication/createUser.service";
import { CreateUserRepository } from "../../repositories/authentication/create-user/createUser.repository";
import { GetUserService } from "../../services/authentication/getUsers.service";
import { GetUserRepository } from "../../repositories/authentication/get-users/getUsers.repository";
import { EncryptorPasswordService } from "../../services/authentication/encryptorPassword.service";
import { SendMailService } from "../../services/global/sendMail.service";
import { Request, Response } from "express";
import { CreateTokenJwt } from "../../services/authentication/createTokenJwt.service";

const authRouter = express.Router();

const getUserRepository = new GetUserRepository();

const getUserService = new GetUserService(getUserRepository);

const createUserValidatorMiddleware = new CreateUserValidatorMiddleware(
  userSchema,
  getUserService,
);

const sendMail = new SendMailService();

const encryptorPasswordService = new EncryptorPasswordService();

const createTokenJwt = new CreateTokenJwt();

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



export default authRouter;
