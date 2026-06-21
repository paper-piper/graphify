import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { config } from '../config'
import { Database } from './schema'

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool(config.db)
  })
})
