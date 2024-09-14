import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from 'postgres';

import schema from "./schemas/__register__"
import { DB_URL } from "../configs/drizzle.config"

const connection = postgres(`${DB_URL}`)

export const DB: PostgresJsDatabase<typeof schema> = drizzle(connection, { schema })