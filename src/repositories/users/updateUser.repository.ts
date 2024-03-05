import { User } from "../../models/authentication/user";
import { IUpdateUserRepository } from "../../interfaces/repositories/users/updateUserRepository.interface";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import { Knex } from "knex";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class UpdateUserRepository implements IUpdateUserRepository {
  public async updateUser(id: number, dataUser: User): Promise<void> {
    try {
      await knexInstance("pacientes")
        .where({ id })
        .update({
          ...dataUser,
        });
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao atualizar o perfil do usuário.");
    }
  }
}
