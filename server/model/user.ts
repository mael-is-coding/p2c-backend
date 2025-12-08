
import { DataTypes } from 'sequelize';
import zod from 'zod';
import ConnectionSingleton from "../database/connection.ts";

const sequelize = ConnectionSingleton.getConnection();

export const User = zod.object({
    id: zod.number(),
    name: zod.string(),
    email: zod.email(),
    phonenumber: zod.string(),
    profile_picture: zod.string()
});

type UserType = zod.infer<typeof User>

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
        phonenumber: DataTypes.STRING,
        profile_picture: DataTypes.STRING
    }
);