import { defineConfig } from 'drizzle-kit';

export const DB_URL = process.env.DATABASE_URL as string

export default defineConfig({
    schema: './src/app/database/schemas/*',
    out: './src/app/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: DB_URL as string
    },
    verbose: true,
    strict: true,
});