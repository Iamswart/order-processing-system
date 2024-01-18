import { Knex } from 'knex';

interface KnexConfig {
  [key: string]: Knex.Config;
}

const knexConfig: KnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString:
        'postgres://mdqcqlih:uBIIquw_W8TEc09dWk7p2enmz9JulZMv@john.db.elephantsql.com/mdqcqlih',
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString:
        'postgres://mdqcqlih:uBIIquw_W8TEc09dWk7p2enmz9JulZMv@john.db.elephantsql.com/mdqcqlih',
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default knexConfig;
