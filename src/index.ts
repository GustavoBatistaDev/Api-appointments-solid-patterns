import express from "express";

import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 15;

import { config } from "dotenv";
import { PostgresGetUsersRepository } from "./repositories/get-users/get-users";
import { GetUsersController } from "./controllers/get-users/get-users";

config();

const app = express();

app.get("/users", async (req, res) => {
  const postgresGetUsersRepository = new PostgresGetUsersRepository();
  const getUsersController = new GetUsersController(postgresGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  return res.status(statusCode).json(body);
});

app.listen(process.env.PORT);
