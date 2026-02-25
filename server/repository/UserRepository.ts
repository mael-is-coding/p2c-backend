import { PartialUserType, /* UserSequelize ,*/ UserType } from "../model/User.ts";
import { usersTable } from "../drizzle/schema.ts"
import ConnectionSingleton from "../database/Connection.ts";
import { eq } from "drizzle-orm";

// TODO : refactor UD so they also return affected rows

const db = ConnectionSingleton.getConnection();

const createUser = async (usr: UserType) => {
    return (await db
    .insert(usersTable)
    .values(usr)
    .returning())[0] ?? null;
}

const findOneUser = async (id: number) => {
    return (await db
    .select()
    .from(usersTable)
    .where(
        eq(
            usersTable.id,
            id
        )
    )
    .limit(1))[0] ?? null;
}

const findOneUserByUsername = async (username: string) => {
    return (await db
    .select()
    .from(usersTable)
    .where(
        eq(
            usersTable.username,
            username
        )
    )
    .limit(1))[0] ?? null;
}

const findOneUserByEmail = async (email: string) => {
    return (await db
    .select()
    .from(usersTable)
    .where(
        eq(
            usersTable.email,
            email
        )
    )
    .limit(1))[0] ?? null;
}

const findAllUsers = () => {
    return db
    .select()
    .from(usersTable) 
    ?? null;
}


const updateUser = (id: number, usr: PartialUserType) => {
    return db
    .update(usersTable)
    .set(usr)
    .where(
        eq(
            usersTable.id,
            id
        )
    ) ?? null;
}

const deleteOne = (id: number) => {
    return db
    .delete(usersTable)
    .where(
        eq (
            usersTable.id,
            id
        )
    ) ?? null;
}

const deleteByName = (username: string) => {
    return db
    .delete(usersTable)
    .where(
        eq(
            usersTable.username,
            username
        )
    ) ?? null;
}

const UserRepository = {
    findOneUser,
    findOneUserByEmail,
    findOneUserByUsername,
    findAllUsers,
    createUser,
    updateUser,
    deleteOne,
    deleteByName
}

export default UserRepository;