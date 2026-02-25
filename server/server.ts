//@ts-types="npm:@types/express@5.0.6"
import express from "express";
// import { WriteDatabase } from "./database/WriteDatabase.ts";
import { ServerVars } from "./utils/Environment.ts";
import "@std/dotenv/load";
import AuthController from "./controller/AuthController.ts";
import UserService from "./service/UserService.ts";
import ResponseService from "./service/ResponseService.ts";
import P2CService from "./service/P2CService.ts";
import { P2CTypeZod } from "./model/P2C.ts";

const app = express(); 
app.use(express.json());

// TO DO : refactor séparation des endpoints --> Route controller [ Service ]
// need to restrict user manipulation endpoints with JWT

app.get('/', (_req, resp) => {
    resp.send("Place 2 Chill - Server is running\n");
});
app.post('/login', AuthController.loginHandler);
app.post('/signup', AuthController.signupHandler);


app.delete('/user/:name', async (req, resp) => {
    const name = req.params.name;
    const result = await UserService.deleteUserByName(name);
    if (result > 0) {
        resp.status(200).send(ResponseService.getSuccessResponse(`User ${name} was deleted`, 
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

app.get('/user/:id', async (req, resp) => {
    const id_param = parseInt(req.params.id);
    const result = await UserService.readOne(id_param);
    if (result) {
        resp.status(200).send(ResponseService.getSuccessResponse("Successfully retrieved data", result))
    } else {
        resp.status(404).send(ResponseService.getFailureResponse("No data found"))
    }
})


app.get('/p2c/:id', async (req, resp) => {
    const id_param = parseInt(req.params.id);
    const p2c = await P2CService.readOne(id_param);
    if (p2c) {
        resp.status(200).send(ResponseService.getSuccessResponse("Successfully retrieved data", p2c))
    } else {
        resp.status(404).send(ResponseService.getFailureResponse("No data found"))
    }
});

app.get('/p2cs/:username', async (req, resp) => {
    const username_param = req.params.username;
    const p2cs = await P2CService.readAllByUsername(username_param);

    if (p2cs) {
        resp.status(200).send(ResponseService.getSuccessResponse("Successfully retrieved data", p2cs))
    } else {
        resp.status(404).send(ResponseService.getFailureResponse("No data found"))
    }
});

app.get('/p2cs', async (_req, resp) => {
    const p2cs = await P2CService.readAll();
    if (p2cs) {
        resp.status(200).send(ResponseService.getSuccessResponse("Successfully retrieved data", p2cs))
    } else {
        resp.status(404).send(ResponseService.getFailureResponse("No data found"))
    }
});

app.get('/p2cs/:uid', async (req, resp) => {
    const uid_param = parseInt(req.params.uid);
    const p2cs = await P2CService.readAllByUid(uid_param);
    if (p2cs) {
        resp.status(200).send(ResponseService.getSuccessResponse("Successfully retrieved data", p2cs))
    } else {
        resp.status(404).send(ResponseService.getFailureResponse("No data found"))
    }
});



app.post('/p2c', async (req, resp) => {
    const body = req.body;
    const p2c_to_create = P2CTypeZod.safeParse(body);

    if (!p2c_to_create.error) {
        const res = await P2CService.createOne(p2c_to_create.data);
        if (res) {
            resp.status(200).send(ResponseService.getSuccessResponse("Successfully created p2c", res));
        } else {
            resp.status(512).send(ResponseService.getFailureResponse("Failed to create p2c", res));
        }
    } else {
        resp.status(401).send(ResponseService.getFailureResponse("Payload is malformed, cannot create p2c.", p2c_to_create.error));
    }
});

app.delete('/p2c/:id', async (req, resp) => {
    const id_param = parseInt(req.params.id);
    const res = await P2CService.deleteP2C(id_param);
    console.log("delete p2c (res)", res);

    if (res) {
        resp.status(200).send(ResponseService.getSuccessResponse("Successfully deleted p2c", 
            {
                affected_rows : res
            }
        ));
    } else {
        resp.status(404).send(ResponseService.getSuccessResponse("No user deleted", 
            {
                affected_rows : res
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
