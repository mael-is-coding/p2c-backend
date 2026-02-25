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

const deleteUser = async (id: number) => { // not called delete because of shadowing
    return (await UserRepository.deleteOne(id)).count;
}

const deleteUserByName = async (name: string) => {
    return (await UserRepository.deleteByName(name)).count;
}

const UserService = {
    create,
    readOne,
    readOneByEmail,
    readOneByUsername,
    readAll,
    update,
    deleteUser,
    deleteUserByName
}

export default UserService;