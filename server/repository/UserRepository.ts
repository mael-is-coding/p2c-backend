import { PartialUserType, /* UserSequelize ,*/ UserType } from "../model/User.ts";
import { usersTable } from "../drizzle/schema.ts"
import ConnectionSingleton from "../database/Connection.ts";
import { eq } from "drizzle-orm";

const db = ConnectionSingleton.connection;

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
    // return UserSequelize.findOne({
    //     where: {
    //         id: id
    //     }
    // });
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
    
    /* UserSequelize.findOne({
        where: {
            username: username
        }
    }); */
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
    
    /* UserSequelize.findOne({
        where: {
            email: email
        }
    }); */
}

const findAllUsers = () => {
    return db
    .select()
    .from(usersTable);
    /* UserSequelize.findAll(); */
}

const createUser = async (usr: UserType) => {
    await db
    .insert(usersTable)
    .values(usr)
    /* UserSequelize.create(usr); */
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
    
    /* UserSequelize.update({
        usr
    }, {
        where: {
            id: id
        }
    }) */
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