import { Knex } from "knex";

import { DatabaseSingleton } from "../../database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();

import { ICreateUserRepository } from "interfaces/repositories/authentication/createUserRepository.interface";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "../../models/authentication/user";

export class CreateUserRepository implements ICreateUserRepository {
  public async createUser(userDTO: IUserDTO): Promise<User> {
    const user: User = await knexInstance("users")
      .insert({
        first_name: userDTO.firstName,
        last_name: userDTO.lastName,
        email: userDTO.email,
        cpf: userDTO.cpf,
        password: userDTO.password,
      })
      .returning(["id", "first_name", "last_name", "cpf", "email"])
      .then((result: User[]) => result[0]);

    return user;
  }
}
