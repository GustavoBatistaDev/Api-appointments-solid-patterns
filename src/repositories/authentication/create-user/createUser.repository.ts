import { Knex } from "knex";

import knexConfig from "../../../database/postgre";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex: Knex = require("knex")(knexConfig);

import { ICreateUserRepository } from "interfaces/user/createUser.interface";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/user";

export class CreateUserRepository implements ICreateUserRepository {
  public async createUser(UserDTO: IUserDTO): Promise<User> {
    const user: User = await knex("users")
      .insert({
        first_name: UserDTO.firstName,
        last_name: UserDTO.lastName,
        email: UserDTO.email,
        cpf: UserDTO.cpf,
        password: UserDTO.password,
      })
      .returning(["id", "first_name", "last_name", "cpf", "email"])
      .then((result: User[]) => result[0]);

    return user;
  }
}
