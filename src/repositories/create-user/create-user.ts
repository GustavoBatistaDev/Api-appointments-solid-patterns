import { User } from "models/user";
import { ICreateUserRepository } from "./protocol";

import { Knex } from "knex";

import knexConfig from "../../database/postgre";
import { IUserDTO } from "controllers/create-user/protocols";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex: Knex = require("knex")(knexConfig);

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(createUserParams: IUserDTO): Promise<User> {
    try {
      const user: User = await knex("users")
        .insert({ ...createUserParams })
        .returning(["id", "name", "username", "email", "password"])
        .then((result: User[]) => result[0]);

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar o usuário no banco de dados.");
    }
  }
}
