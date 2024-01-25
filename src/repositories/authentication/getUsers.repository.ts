import { IGetUserRepository } from "../../interfaces/repositories/authentication/getUsersRepository.interface";

import { User } from "models/authentication/user";
import { IGetUserByIdRepository } from "interfaces/repositories/users/getUserById.interface";
import { Knex } from "knex";
import { DatabaseSingleton } from "../../infra/database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class GetUserRepository implements IGetUserRepository {
  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await knexInstance("pacientes")
      .where({ email: email })
      .select("*")
      .first();
    return user;
  }
  public async getUserByCpfOrEmail(
    cpf: string,
    email: string,
  ): Promise<boolean> {
    const userExists = await knexInstance("pacientes")
      .where({ email: email })
      .orWhere({ cpf: cpf })
      .select("*");
    console.log(userExists);
    return userExists.length > 0 ? true : false;
  }
}

export class GetUserByIdRepository implements IGetUserByIdRepository {
  async getUserByid(ìd: number): Promise<User> {
    const user: User = await knexInstance("pacientes")
      .where({ id: ìd })
      .then((result: User[]) => result[0]);
    return user;
  }
}
