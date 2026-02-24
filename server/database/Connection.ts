import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js/driver";

export default class ConnectionSingleton {
    static connection: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
};

    static getConnection() {
        if (!ConnectionSingleton.connection) {
            const POSTGRES_URL = Deno.env.get("POSTGRES_URL");
            if (!POSTGRES_URL) {
                throw new Error ("POSTGRES_URL is either not set or incorrect.");
            } else {
                ConnectionSingleton.connection = drizzle(postgres(POSTGRES_URL))
            }
        } 
        if (!ConnectionSingleton.connection) {
            throw new Error("Connection to database could not be set.");
        }

        return ConnectionSingleton.connection;
    }
}