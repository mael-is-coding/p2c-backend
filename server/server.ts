// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import "@std/dotenv/load";
import ConnectionSingleton from "./database/connection.ts";
import { WriteDatabase } from "./database/write-db.ts";
import { ServerVars } from "./utils/environment.ts";

const app = express();
app.use(express.json());

const sequelize = ConnectionSingleton.getConnection();
WriteDatabase({force: false});

app.get('/', (_req, resp) => {
    resp.send("Place 2 Chill - Server is running\n");
});

app.post('/login', (req, resp) => {
    
});


if (ServerVars.PORT) {
    app.listen({port: parseInt(ServerVars.PORT)});
} else {
    app.listen({port: 3000});
}
