import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import process from "node:process";

import { Sequelize } from "npm:sequelize";

// export class SQLZConnectionSingleton {
//     static connection: Sequelize;

//     static getConnection(): Sequelize {

//         const PG_DB = Deno.env.get("POSTGRES_DB");
//         const PG_USR = Deno.env.get("POSTGRES_USER");
//         const PG_PWD = Deno.env.get("POSTGRES_PASSWORD");

//         // console.log(`PG_DB : ${PG_DB}\nPG_USR : ${PG_USR}\nPG_PWD : ${}`)

//         if (SQLZConnectionSingleton.connection) {
//             return this.connection;
//         } else {
//             try {
//                 if(PG_DB && PG_USR && PG_PWD) {
//                     SQLZConnectionSingleton.connection = new Sequelize(PG_DB, PG_USR, PG_PWD, {
//                         dialect: "postgres",
//                         host: "database",
//                         port: 5432
//                     });
//                     return this.connection;
//                 }
//             } catch (error) {
//                 console.log("[ORM <--> DB] ERROR OCCURED");
//                 console.log(error);
//             }

//             return new Sequelize("", "", "", {
//                 dialect: "postgres",
//                 host: "database",
//                 port: 5432,
//             });
//         }
//     }
// }


export default class ConnectionSingleton {
    // static connection = drizzle(postgres(Deno.env.get("PG_URL")!));

    static connection = (() => {
        const url = Deno.env.get("POSTGRES_URL");
        console.log("PG_URL:", url); // you'll probably see: PG_URL: undefined
        if (!url) throw new Error("PG_URL not set");
        return drizzle(postgres(url));
    })();
}