
import { DataTypes } from 'sequelize';
import zod from 'zod';
import ConnectionSingleton from "../database/connection.ts";

const sequelize = ConnectionSingleton.getConnection();

export const User = zod.object({
    name: zod.string(),
    email: zod.email(),
    password: zod.string(),
    phonenumber: zod.string(),
    profile_picture: zod.string()
});

export type UserType = zod.infer<typeof User>

export const UserSequelize = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        profile_picture: DataTypes.STRING
    }
);