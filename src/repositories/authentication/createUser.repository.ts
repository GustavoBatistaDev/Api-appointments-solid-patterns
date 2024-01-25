import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();

import { ICreateUserRepository } from "interfaces/repositories/authentication/createUserRepository.interface";
import { IUserDTO } from "interfaces/users/userDTO.interface";
import { User } from "../../models/authentication/user";

export class CreateUserRepository implements ICreateUserRepository {
  public async createUser(userDTO: IUserDTO): Promise<User> {
    const user: User = await knexInstance("pacientes")
      .insert({
        nome: userDTO.nome,
        ultimo_nome: userDTO.ultimo_nome,
        email: userDTO.email,
        cpf: userDTO.cpf,
        senha: userDTO.senha,
      })
      .returning("*")
      .then((result: User[]) => result[0]);

    return user;
  }
}
