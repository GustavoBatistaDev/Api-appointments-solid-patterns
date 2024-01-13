import { IGetUsersRepository } from "../../repositories/get-users/protocols";
import { User } from "models/user";
import { Knex } from "knex";

import knexConfig from "../../database/postgre";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex: Knex = require("knex")(knexConfig);

export class PostgresGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    try {
      const result: User[] = await knex.select("*").from("users");

      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter usuários do banco de dados.");
    }
  }
}
