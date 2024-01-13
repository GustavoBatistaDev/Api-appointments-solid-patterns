import { User } from "models/user";
import { ICreateUserRepository } from "./protocol";

import { Knex } from "knex";

import knexConfig from "../../database/postgre";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex: Knex = require("knex")(knexConfig);

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(): Promise<User> {
    try {
      const user: User = await knex("users")
        .insert({
          name: "name",
          username: "first_name",
          password: "password",
          email: "email",
        })
        .returning(["id", "name", "username", "email", "password"])
        .then((result: User[]) => result[0]);

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar o usuário no banco de dados.");
    }
  }
}
