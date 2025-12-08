
import { Sequelize } from "sequelize"

export default class ConnectionSingleton {
    static connection: Sequelize;

    static getConnection(): Sequelize {

        const PG_DB = Deno.env.get("POSTGRES_DB");
        const PG_USR = Deno.env.get("POSTGRES_USER");
        const PG_PWD = Deno.env.get("POSTGRES_PASSWORD");

        // console.log(`PG_DB : ${PG_DB}\nPG_USR : ${PG_USR}\nPG_PWD : ${}`)

        if (ConnectionSingleton.connection) {
            return this.connection;
        } else {
            try {
                if(PG_DB && PG_USR && PG_PWD) {
                    ConnectionSingleton.connection = new Sequelize(PG_DB, PG_USR, PG_PWD, {
                        dialect: "postgres",
                        host: "database",
                        port: 5432
                    });
                    return this.connection;
                }
            } catch (error) {
                console.log("[ORM <--> DB] ERROR OCCURED");
                console.log(error);
            }

            return new Sequelize("", "", "", {
                dialect: "postgres",
                host: "database",
                port: 5432,
            });
        }
    }
}