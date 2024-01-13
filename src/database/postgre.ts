import { Knex } from 'knex';

const knex: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'seu-usuario',
    password: 'sua-senha',
    database: 'auth',
  }
};

export default knex;
