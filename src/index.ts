import express from "express";

import { config } from "dotenv";
import { CreateUserRepository } from "./repositories/authentication/register-user/createUser.repository";
import { CreateUserService } from "./services/createUser.service";
import { CreateUserController } from "./controllers/authentication/createUser.controller";

config();

const app = express();

app.use(express.json());

app.post("/user/api", async (req, res) => {
  const createUserRepository = new CreateUserRepository();
  const createUserService = new CreateUserService(createUserRepository);
  const createUserController = new CreateUserController(createUserService);

  const { body, statusCode } = await createUserController.handle({
    body: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      cpf: req.body.cpf,
      password: req.body.password,
    },
  });

  return res.status(statusCode).json(body);
});

export default app;
