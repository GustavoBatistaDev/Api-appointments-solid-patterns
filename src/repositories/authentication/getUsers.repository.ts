import { IGetUserRepository } from "../../interfaces/repositories/authentication/getUsersRepository.interface";

import { User } from "models/authentication/user";
import { IGetUserByIdRepository } from "interfaces/repositories/users/getUserById.interface";
import { Knex } from "knex";
import { DatabaseSingleton } from "../../database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class GetUserRepository implements IGetUserRepository {
  public async getUserByCpfOrEmail(
    cpf: string,
    email: string,
  ): Promise<boolean> {
    const userExists = await knexInstance("users")
      .where({ email: email })
      .orWhere({ cpf: cpf })
      .select("*");

    return userExists.length > 0 ? true : false;
  }
}

export class GetUserByIdRepository implements IGetUserByIdRepository {
  async getUserByid(ìd: number): Promise<User> {
    const user: User = await knexInstance("users")
      .where({ id: ìd })
      .then((result: User[]) => result[0]);
    return user;
  }
}
