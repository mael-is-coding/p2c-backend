// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import "@std/dotenv/load";
import ConnectionSingleton from "./database/connection.ts";
import { LoginModel } from "./model/loginModel.ts";
import { User } from './model/user.ts';
import { WriteDatabase } from "./database/write-db.ts";
import { ServerVars } from "./utils/environment.ts";
import { createUser } from "./repository/user_crud.ts";
import bcrypt from 'bcryptjs'



const app = express();
app.use(express.json());

const sequelize = ConnectionSingleton.getConnection();
WriteDatabase({force: false});

app.get('/', (_req, resp) => {
    resp.send("Place 2 Chill - Server is running\n");
});

app.post('/login', (req, resp) => {
    try {
        const res = LoginModel.parse(req.body);
    } catch (error) {
        console.log(`[LOGIN] : error - invalid login request. Complete error below\n${error}`);
        resp.status(401).send("Bad request");
    }
});

app.post('/signup', (req, resp) => {
    try {
        const usr = User.parse(req.body);
        usr.password = bcrypt.hashSync(usr.password);
        createUser(usr)
        .then()
        .catch((error) => {
            console.log(`[LOGIN] : Internal Server Error... Please try again later :')\n${error}`);
            resp.status(500).send(`[LOGIN] : Internal Server Error... Please try again later :')\n${error}`);
        });
    } catch (error) {
        console.log(`[LOGIN] : error - invalid login request. Complete error below\n${error}`);
        resp.status(401).send("Bad request");
    }
})


if (ServerVars.PORT) {
    app.listen({port: parseInt(ServerVars.PORT)});
} else {
    app.listen({port: 3000});
}
