
import { Request, Response, NextFunction } from "express";
import { LoginModel, LoginModelWithEmail } from "../model/LoginModel.ts";
import ResponseService from "../service/ResponseService.ts";
import AuthService from "../service/AuthService.ts";
import UserService from "../service/UserService.ts";
import { UserTypeZod } from "../model/User.ts";

const signupHandler = async (req: Request, resp: Response, next: NextFunction) => {
    const usr = UserTypeZod.safeParse(req.body);

    if(usr.error) {
        resp.status(401).send(ResponseService.getFailureResponse("Account could not be created as input was malformed.", usr.error));
        next();
    } else {
        const usr_with_email = await UserService.readOneByUsername(usr.data.name);

        if (!usr_with_email) {
            try {
                const response = await AuthService.signup(usr.data);
                if(response.success) {
                    resp.status(200).send(response);
                    next();
                } else {
                    resp.status(401).send(response);
                    next();
                }
            } catch (error) {
                resp.status(500).send(ResponseService.getFailureResponse(`Account could not be created`, error));
                next();
            }
        } else {
            resp.status(401).send(ResponseService.getFailureResponse(`User with email ${usr.data.email}`));
            next();
        }
    };
}


const loginHandler = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const res = (Object.hasOwn(req.body, "email") ? LoginModelWithEmail.safeParse(req.body) : LoginModel.safeParse(req.body))

        if (res.error) {
            console.log(`error while parsing login payload :\n${res.error}`);
            resp.status(401).send(ResponseService.getFailureResponse("Some fields are invalid.", res.error.issues));
            next();
        } else {
            const response = await AuthService.login(res.data);
            if (response.success) {
                resp.status(200).send(response);
                next();
            } else {
                resp.status(404).send(response);
                next();
            }
        };              
    }
    catch (error) {
        console.log(`[LOGIN] : error - invalid login request. Complete error below\n${error}`);
        resp.status(401).send(ResponseService.getFailureResponse("Could not login, problems occured.", error));
        next();
    }
}

const AuthController = {
    signupHandler,
    loginHandler
}

export default AuthController;