import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './schema'

export let db: Kysely<Database>;

export function buildDb(){
  db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      })
    })
  });
}

