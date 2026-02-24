import { eq } from "drizzle-orm";
import ConnectionSingleton from "../database/Connection.ts";
import { p2cTable } from "../drizzle/schema.ts";
import { P2CType, PartialP2C } from "../model/P2C.ts";

// TODO : refactor UD so they also return affected rows

const db = ConnectionSingleton.getConnection();

async function create(p2c: P2CType) {
    return (await db
        .insert(p2cTable)
        .values(p2c)
        .returning()
    )[0];
}

async function findOne(id: number) {
    return (await db
        .select()
        .from(p2cTable)
        .where(
            eq(p2cTable.id, id)
        )
        .limit(1))[0];
}

function findAll() {
    return db
        .select()
        .from(p2cTable);
}

function findAllByUid(uid: number) {
    return db
        .select()
        .from(p2cTable)
        .where(
            eq(p2cTable.uid, uid)
        )
}

function updateById(id: number, p2c: PartialP2C) {
    return db
    .update(p2cTable)
    .set(p2c)
    .where(eq(p2cTable.id, id));
}

function deleteP2C(id: number) {
    return db
    .delete(p2cTable)
    .where(eq(p2cTable.id, id));
}

const P2CRepository = {
    create,
    findOne,
    findAllByUid,
    findAll,
    updateById,
    deleteP2C
}

export default P2CRepository;