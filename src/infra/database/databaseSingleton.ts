import { Knex } from "knex";
import { config } from "dotenv";

config();

export class DatabaseSingleton {
  private static instance: Knex | null = null;

  private constructor() {
    // Configuração do Knex
    const knexConfig = {
      client: process.env.CLIENT_DATABASE,
      connection: {
        host: process.env.HOST_DATABASE,
        user: process.env.USER_DATABASE,
        password: process.env.PASSWORD_DATABASE,
        database: process.env.DATABASE_NAME,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    DatabaseSingleton.instance = require("knex")(knexConfig);
  }

  public static getInstance(): Knex {
    if (!DatabaseSingleton.instance) {
      new DatabaseSingleton();
    }

    return DatabaseSingleton.instance as Knex;
  }
}
