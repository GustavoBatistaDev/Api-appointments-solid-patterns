import express from "express";

import { config } from "dotenv";
import { CreateUserRepository } from "./repositories/authentication/create-user/createUser.repository";
import { CreateUserService } from "./services/createUser.service";
import { CreateUserController } from "./controllers/authentication/createUser.controller";
import { Request, Response } from "express";
import { CreateUserValidatorMiddleware } from "./middlewares/authentication/createUserValidate.middleware";
import { userSchema } from "./schemas/user.schema";

config();

const app = express();

app.use(express.json());

const createUserValidatorMiddleware = new CreateUserValidatorMiddleware(
  userSchema,
);

app.use(createUserValidatorMiddleware.validate);

app.post("/user/api", async (req: Request, res: Response) => {
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

export default app;
