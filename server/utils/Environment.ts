
// server
export class ServerVars {
    public static readonly PORT = Deno.env.get("SERVER_PORT");
}


// database

export class DBVars {
    public static readonly PG_DB = Deno.env.get("POSTGRES_DB");
    public static readonly PG_USR = Deno.env.get("POSTGRES_USER");
    public static readonly PG_PWD = Deno.env.get("POSTGRES_PASSWORD");
}