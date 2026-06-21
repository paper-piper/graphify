import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { config } from '../config'
import { Database } from './schema'

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ // whats dialect
    pool: new Pool(config.db) // TODO: whats pool?
  })
})
