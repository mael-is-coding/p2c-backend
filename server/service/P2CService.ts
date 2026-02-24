import P2CRepository from "../repository/P2CRepository.ts";
import { P2CType, PartialP2C } from "../model/P2C.ts";
import UserService from "./UserService.ts"

const createOne = (p2c: P2CType) => {
    return P2CRepository.create(p2c);
}

const readOne = (id: number) => {
    return P2CRepository.findOne(id);
}

const readAllByUsername = async (username: string) => {
    const user = await UserService.readOneByUsername(username);
    if (user) {
        const p2cs = await P2CService.readAllByUid(user.id);
        return p2cs;
    } else {
        return [];
    }
}

const readAll = () => {
    return P2CRepository.findAll();
}

const readAllByUid = (uid: number) => {
    return P2CRepository.findAllByUid(uid);
}

const updateById = (id: number, p2c: PartialP2C) => {
    return P2CRepository.updateById(id, p2c);
}

const deleteP2C = (id: number) => {
    return P2CRepository.deleteP2C(id);
}

const P2CService = {
    createOne,
    readOne,
    readAll,
    readAllByUid,
    readAllByUsername,
    updateById,
    deleteP2C
}

export default P2CService;