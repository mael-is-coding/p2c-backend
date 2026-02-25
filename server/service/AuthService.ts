
import UserService from "./UserService.ts";
import { LoginModelType, LoginModelWithEmailType } from "../model/LoginModel.ts"
import { Failure, Success } from "../model/LoginResponse.ts";
import ResponseService  from "./ResponseService.ts";
import { UserType } from "../model/User.ts";
import EncryptionService from "./EncryptionService.ts";


const signup = async (usr: UserType) => {
    console.log("[signup] received user : ", usr);
    usr.password = EncryptionService.hash(usr.password);
    const res = await UserService.create(usr);
    return ResponseService.getSuccessResponse(
        "User successfully created", 
        res
    );
}


const login = async (payload: LoginModelType | LoginModelWithEmailType): Promise<Failure | Success> => {
    const usr = ("email" in payload ? 
        await UserService.readOneByEmail(payload.email) : 
        await UserService.readOneByUsername(payload.username));
    if (usr) {
        if (usr.password) {
            if (EncryptionService.compare(payload.password, usr.password)) {
                const {password, ...user} = usr;
                return ResponseService.getSuccessResponse("Successfully logged in.", user);
            } else {
                return ResponseService.getFailureResponse("Either email or password is incorrect. Please try again !");
            }
        } else {
            return ResponseService.getFailureResponse("Internal Server Error, User isn't normally formed.");
        }
    } else {
        return ResponseService.getFailureResponse("No user was found. Please check your credentials")
    }
}

const profile_picture = async () => {

}

const AuthService = {
    signup,
    login,
    profile_picture
}

export default AuthService;