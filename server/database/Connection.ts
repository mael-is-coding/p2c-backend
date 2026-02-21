import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default class ConnectionSingleton {
    static connection = (() => {
        const url = Deno.env.get("POSTGRES_URL");
        if (!url) throw new Error("POSTGRES_URL is not set in env");
        return drizzle(postgres(url));
    })();
}