
import UserService from "./UserService.ts";
import { LoginModelType, LoginModelWithEmailType } from "../model/LoginModel.ts"
import { Failure, Success } from "../model/LoginResponse.ts";
import ResponseService  from "./ResponseService.ts";
import { UserType } from "../model/User.ts";
import EncryptionService from "./EncryptionService.ts";


const signup = async (usr: UserType) => {
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
    if (usr[0]) {
        if (usr[0].password) {
            if (EncryptionService.compare(payload.password, usr[0].password)) {
                return ResponseService.getSuccessResponse("Successfully logged in.");
            } else {
                return ResponseService.getFailureResponse("Either email or password is incorrect. Please try again !");
            }
        } else {
            return ResponseService.getFailureResponse("Internal Server Error, User isn't normally formed.");
        }
    } else {
        return ResponseService.getFailureResponse("No user was found. Please check your email")
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