import { PartialUserType, UserSequelize, UserType } from "../model/User.ts";

const findOneUser = (id: number) => {
    return UserSequelize.findOne({
        where: {
            id: id
        }
    });
}

const findOneUserByUsername = (username: string) => {
    return UserSequelize.findOne({
        where: {
            username: username
        }
    });
}

const findOneUserByEmail = (email: string) => {
    return UserSequelize.findOne({
        where: {
            email: email
        }
    });
}

const findAllUsers = () => {
    return UserSequelize.findAll();
}

const createUser = (usr: UserType) => {
    return UserSequelize.create(usr);
}

const updateUser = (id: number, usr: PartialUserType) => {
    return UserSequelize.update({
        usr
    }, {
        where: {
            id: id
        }
    })
}

const UserRepository = {
    findOneUser,
    findOneUserByEmail,
    findOneUserByUsername,
    findAllUsers,
    createUser,
    updateUser
}

export default UserRepository;