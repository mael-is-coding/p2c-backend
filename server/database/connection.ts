
import { Sequelize } from "sequelize"

export default class ConnectionSingleton {
    static connection: Sequelize;

    static getConnection(): Sequelize {
        if (ConnectionSingleton.connection) {
            return this.connection;
        } else {
            ConnectionSingleton.connection = new Sequelize("postgres://");
            return this.connection;
        }
    }
}