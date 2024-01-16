import { Knex } from 'knex';

const knex: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'seu-usuario',
    password: 'sua-senha',
    database: 'scheduling_system',
  }
};

export default knex;
