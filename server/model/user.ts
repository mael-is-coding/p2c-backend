
import { Model, DataTypes } from 'sequelize';
import ConnectionSingleton from "../database/connection.ts";

const sequelize = ConnectionSingleton.getConnection()

class UserModel extends Model {
    name: string
    email: string
    phonenumber: string
    profile_picture: string

    constructor(
        name: string,
        email: string,
        phonenumber: string,
        profile_picture: string
    ) { 
        super()
        this.name = name
        this.email = email
        this.phonenumber = phonenumber
        this.profile_picture = profile_picture
    }
};

const User = UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    {
        sequelize,
        modelName: 'User',
    }
});