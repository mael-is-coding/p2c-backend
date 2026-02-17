import { defineConfig } from 'drizzle-kit';
import { DBVars } from "./utils/Environment.ts";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: DBVars.PG_URL
  }
  /*
  dbCredentials: {
    host: 'localhost',
    user: 'cosmos',
    password: 'p2c-db-pwd',
    database: 'p2c-database',
    port: 5432,
    ssl: true,
  }
  */
})