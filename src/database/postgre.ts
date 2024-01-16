import { Knex } from 'knex';

const knex: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE_NAME,
  }
};

export default knex;

