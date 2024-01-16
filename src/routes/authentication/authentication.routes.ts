// routes.ts

import express from "express";
import { CreateUserValidatorMiddleware } from "../../middlewares/authentication/createUserValidate.middleware";
import { userSchema } from "../../schemas/authentication/user.schema";
import { CreateUserController } from "../../controllers/authentication/createUser.controller";
import { CreateUserService } from "../../services/authentication/createUser.service";
import { CreateUserRepository } from "../../repositories/authentication/create-user/createUser.repository";

const authRouter = express.Router();

const createUserValidatorMiddleware = new CreateUserValidatorMiddleware(
  userSchema,
);

authRouter.use(createUserValidatorMiddleware.validateDataCreateUser);

authRouter.post("/user/api", async (req, res) => {
  const createUserRepository = new CreateUserRepository();
  const createUserService = new CreateUserService(createUserRepository);
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
});

export default authRouter;
