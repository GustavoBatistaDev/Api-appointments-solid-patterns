import { IUpdatePasswordRepository } from "../../interfaces/repositories/authentication/updatePassword.interface";
import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import { Knex } from "knex";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class UpdatePasswordRepository implements IUpdatePasswordRepository {
  public async updatePassword(id: number, password: string): Promise<void> {
    try {
      await knexInstance("pacientes").where({ id }).update({ senha: password });
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao atualizar password");
    }
  }
}
