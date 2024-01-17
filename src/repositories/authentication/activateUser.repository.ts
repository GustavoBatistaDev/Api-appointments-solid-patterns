import { IActivateUser } from "../../interfaces/authentication/activateUser.interface";

import { Knex } from "knex";

import knexConfig from "../../database/postgre";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex: Knex = require("knex")(knexConfig);

export class ActivateUserRepository implements IActivateUser {
  public async activateUser(id: number): Promise<void> {
    await knex("users").update({ active: true }).where({ id });
  }
}
