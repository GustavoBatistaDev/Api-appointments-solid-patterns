import { IGetUserRepository } from "interfaces/repositories/authentication/getUsersRepository.interface";
import { Knex } from "knex";

import knexConfig from "../../../database/postgre";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex: Knex = require("knex")(knexConfig);

export class GetUserRepository implements IGetUserRepository {
  public async getUserByCpfOrEmail(
    cpf: string,
    email: string,
  ): Promise<boolean> {
    const userExists = await knex("users")
      .where({ email: email })
      .orWhere({ cpf: cpf })
      .select("*");

    return userExists.length > 0 ? true : false;
  }
}
