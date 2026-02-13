//@ts-types="npm:@types/express@5.0.6"
import express from "express";
import { LoginModel, LoginModelWithEmail } from "./model/transaction/LoginModel.ts";
import ResponseService from "./service/ResponseService.ts"
import { User } from './model/User.ts';
import { WriteDatabase } from "./database/write-db.ts";
import { ServerVars } from "./utils/environment.ts";
import { createUser, findOneUserByEmail, findOneUserByUsername } from "./repository/user_crud.ts";
import bcrypt from 'bcryptjs';
import "@std/dotenv/load";

const app = express(); 
app.use(express.json());
WriteDatabase({force: false});

// TO DO : refactor séparation des endpoints --> Route controller [ Service ]

app.get('/', (_req, resp) => {
    resp.send("Place 2 Chill - Server is running\n");
});

app.post('/login', (req, resp) => {
    try {
        const res = (Object.hasOwn(req.body, "email") ? LoginModelWithEmail.safeParse(req.body) : LoginModel.safeParse(req.body))

        if (res.error) {
            console.log(`error while parsing login payload :\n${res.error}`);
            resp.status(404).send(ResponseService.getFailureResponse("Some fields are invalid.", res.error.issues));
        } else {
            const usr = ("email" in res.data ? findOneUserByEmail(res.data.email) : findOneUserByUsername(res.data.username))
            usr
            .then((usr) => {
                if(usr) {
                    return bcrypt.compareSync(res.data.password, usr?.dataValues.password)
                } else {
                    return false;
                }
            })
            .then((success) => {
                success ? 
                resp.status(200).send(ResponseService.getSuccessResponse("Log In was successful ! Welcome back :)")) : 
                resp.status(401).send(ResponseService.getFailureResponse("Email/Username or password is incorrect, please try again !"));
            });              
        }
    } catch (error) {
        console.log(`[LOGIN] : error - invalid login request. Complete error below\n${error}`);
        resp.status(401).send(ResponseService.getFailureResponse("Could not login, problems occured.", error));
    }
});

app.post('/signup', (req, resp) => {
    const usr = User.safeParse(req.body);

    if(usr.error) {
        console.log(`[SIGNUP] : error - invalid signup request. Full error below\n${usr.error}\nbody : ${JSON.stringify(req.body)}`);
        resp.status(401).send(ResponseService.getFailureResponse("Account could not be created as input was malformed.", usr.error));
    } else {
        (async () => {
            const usr_with_email = await findOneUserByUsername(usr.data.name);

            if (!usr_with_email) {
                try {
                    usr.data.password = bcrypt.hashSync(usr.data.password);
                    await createUser(usr.data);
                    resp.status(200).send(ResponseService.getSuccessResponse(`Account successfully created !`));
                    console.log("user successfully created");
                } catch (error) {
                    console.log(`account could not be created, please try again :(. Full error :\n${error}`);
                    resp.status(500).send(ResponseService.getFailureResponse(`account could not be created`, error));
                }
            }
        })();
    }
});


if (ServerVars.PORT) {
    app.listen({
        hostname: "0.0.0.0",
        port: parseInt(ServerVars.PORT)
    });
} else {
    app.listen({
        hostname: "0.0.0.0",
        port: 3000
    });
}
