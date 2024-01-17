import { IGetUserRepository } from "../../interfaces/repositories/authentication/getUsersRepository.interface";
import { Knex } from "knex";

import knexConfig from "../../database/postgre";
import { User } from "models/authentication/user";
import { IGetUserByIdRepository } from "interfaces/repositories/users/getUserById.interface";

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

export class GetUserByIdRepository implements IGetUserByIdRepository{
  async getUserByid(ìd: number): Promise<User> {
    const user: User = await knex("users")
      .where({ id: ìd })
      .then((result: User[]) => result[0]);
    return user;
  }
}
