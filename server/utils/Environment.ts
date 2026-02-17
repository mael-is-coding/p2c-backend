import process from "node:process";

/* 
node:process must be used because drizzle-kit uses its own Node runtime,
which isn't aware of Deno at all
*/

// server
export class ServerVars {
    public static readonly PORT = process.env.SERVER_PORT;
}


// database
export class DBVars {
    public static readonly PG_DB = (process.env.POSTGRES_DB) ? 
    process.env.POSTGRES_DB! : "db-no-env-set";
    public static readonly PG_USR = (process.env.POSTGRES_USER) ? 
    process.env.POSTGRES_USER! : "usr-no-env-set";
    public static readonly PG_PWD = (process.env.POSTGRES_PASSWORD) ? 
    process.env.POSTGRES_PASSWORD! : "pwd-no-env-set";
    public static readonly PG_HOST = (process.env.POSTGRES_HOST) ? 
    process.env.POSTGRES_HOST! : "pg-host-no-env-set";
    public static readonly PG_URL = (process.env.POSTGRES_URL) ?
    process.env.POSTGRES_URL! : "";
}