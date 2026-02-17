
import { DataTypes } from 'npm:sequelize';
import zod from '@zod/zod';
// import { SQLZConnectionSingleton } from "../database/Connection.ts";

// const sequelize = SQLZConnectionSingleton.getConnection();

export const User = zod.object({
    id: zod.number(),
    username: zod.string(),
    name: zod.string(),
    email: zod.email(),
    password: zod.string(),
    phonenumber: zod.string(),
    profile_picture: zod.base64()
});
export const UserTypeZod = User.omit({id: true});
export const PartialUserTypeZod = User.partial();

export type UserDatabaseType = zod.infer<typeof User>;
export type UserType = zod.infer<typeof UserTypeZod>; // Omit<zod.infer<typeof User>, "id">;
export type PartialUserType = Partial<UserType>;


// export const UserSequelize = sequelize.define(
//     'User',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         username: DataTypes.STRING,
//         name: DataTypes.STRING,
//         email: DataTypes.STRING,
//         password: DataTypes.STRING,
//         phonenumber: DataTypes.STRING,
//         profile_picture: DataTypes.STRING
//     }
// );
