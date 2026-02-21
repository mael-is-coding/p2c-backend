import { PartialUserType, /* UserSequelize ,*/ UserType } from "../model/User.ts";
import { usersTable } from "../drizzle/schema.ts"
import ConnectionSingleton from "../database/Connection.ts";
import { eq } from "drizzle-orm";

const db = ConnectionSingleton.connection;

const createUser = async (usr: UserType) => {
    return (await db
    .insert(usersTable)
    .values(usr)
    .returning())[0];
}

const findOneUser = (id: number) => {
    return db
    .select()
    .from(usersTable)
    .where(
        eq(
            usersTable.id,
            id
        )
    )
    .limit(1);
}

const findOneUserByUsername = (username: string) => {
    return db
    .select()
    .from(usersTable)
    .where(
        eq(
            usersTable.username,
            username
        )
    )
    .limit(1)
}

const findOneUserByEmail = (email: string) => {
    return db
    .select()
    .from(usersTable)
    .where(
        eq(
            usersTable.email,
            email
        )
    )
    .limit(1);
}

const findAllUsers = () => {
    return db
    .select()
    .from(usersTable);
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
    )
}

const deleteOne = (id: number) => {
    return db
    .delete(usersTable)
    .where(
        eq (
            usersTable.id,
            id
        )
    );
}

const deleteByName = (username: string) => {
    return db
    .delete(usersTable)
    .where(
        eq(
            usersTable.username,
            username
        )
    );
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