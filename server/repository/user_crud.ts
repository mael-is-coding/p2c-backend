import { UserSequelize, UserType } from "../model/User.ts";

export function findOneUser(id: number) {
    return UserSequelize.findOne({
        where: {
            id: id
        }
    });
}

export function findOneUserByUsername(username: string) {
    return UserSequelize.findOne({
        where: {
            username: username
        }
    });
}

export function findOneUserByEmail(email: string) {
    return UserSequelize.findOne({
        where: {
            email: email
        }
    });
}

export function findAllUsers() {
    return UserSequelize.findAll();
}

export function createUser(usr: UserType) {
    return UserSequelize.create(usr);
}

export function updateUserName(id: number, name: string) {
    UserSequelize.update({
        name: name
    },
    {
        where: {
            id: id
        }
    });
}

export function updateUserEmail(id: number, email: string) {
    UserSequelize.update({
        email: email,
    }, 
    {
        where: {
            id: id
        }
    });
}

export function updatePhoneNumber(id: number, phonenumber: number) {
    UserSequelize.update({
        phonenumber: phonenumber,
    }, 
    {
        where: {
            id: id
        }
    });
}