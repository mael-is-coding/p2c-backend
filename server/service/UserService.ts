import { PartialUserType, UserType } from "../model/User.ts";
import UserRepository from "../repository/UserRepository.ts";

const create = (usr: UserType) => {
    return UserRepository.createUser(usr);
}

const readOne = (id: number) => {
    return UserRepository.findOneUser(id);
}

const readOneByEmail = (email: string) => {
    return UserRepository.findOneUserByEmail(email);
}

const readOneByUsername = (username: string) => {
    return UserRepository.findOneUserByUsername(username);
}

const readAll = () => {
    return UserRepository.findAllUsers();
}

const update = (id: number, usr: PartialUserType) => {
    return UserRepository.updateUser(id, usr);
}

const UserService = {
    create,
    readOne,
    readOneByEmail,
    readOneByUsername,
    readAll,
    update
}

export default UserService;