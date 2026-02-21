//@ts-types="npm:@types/express@5.0.6"
import express from "express";
// import { WriteDatabase } from "./database/WriteDatabase.ts";
import { ServerVars } from "./utils/Environment.ts";
import "@std/dotenv/load";
import AuthController from "./controller/AuthController.ts";
import UserService from "./service/UserService.ts";
import ResponseService from "./service/ResponseService.ts";

const app = express(); 
app.use(express.json());
// WriteDatabase({alter: true});

// TO DO : refactor séparation des endpoints --> Route controller [ Service ]

app.get('/', (_req, resp) => {
    resp.send("Place 2 Chill - Server is running\n");
});
app.post('/login', AuthController.loginHandler);
app.post('/signup', AuthController.signupHandler);

// strictly internal to app.
app.delete('/user/:username', async (req, resp) => {
    const username = req.params.username;
    const result = await UserService.deleteUserByName(username);
    if (result > 0) {
        resp.status(200).send(ResponseService.getSuccessResponse(`User ${username} was deleted`, 
            { 
                affected_rows: result
            }
        ));
    } else {
        resp.status(404).send(ResponseService.getFailureResponse(`No user deleted.`,
            {
                affected_rows: result
            }
        ));
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
