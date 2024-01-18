import { IActivateUserRepository } from "../../interfaces/authentication/activateUser.interface";

import { Knex } from "knex";

import { DatabaseSingleton } from "../../database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class ActivateUserRepository implements IActivateUserRepository {
  public async activateUser(id: number): Promise<void> {
    await knexInstance("users").update({ active: true }).where({ id });
  }
}
