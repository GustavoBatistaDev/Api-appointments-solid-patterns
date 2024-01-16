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

const authRouter = express.Router();

const getUserRepository = new GetUserRepository();

const getUserService = new GetUserService(getUserRepository);

const createUserValidatorMiddleware = new CreateUserValidatorMiddleware(
  userSchema,
  getUserService,
);

const encryptorPasswordService = new EncryptorPasswordService();

authRouter.post(
  "/user/api",
  createUserValidatorMiddleware.validateDataCreateUser,
  createUserValidatorMiddleware.validateEmailAndCpfExistsInDB,
  async (req, res) => {
    const createUserRepository = new CreateUserRepository();
    const createUserService = new CreateUserService(createUserRepository, encryptorPasswordService);
    const createUserController = new CreateUserController(createUserService);

    const { body, statusCode } = await createUserController.handle({
      body: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cpf: req.body.cpf,
        password: req.body.password,
      },
    });

    return res.status(statusCode).json(body);
  },
);

export default authRouter;
