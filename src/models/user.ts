import { dataBase } from './../config/db.js';
import { Model, DataTypes, Optional } from 'sequelize';
import RefreshTokenModel from './refreshToken.js';

interface UserAttributes {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string,
    registerDate: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'registerDate'> { };

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare password: string;
    declare registerDate: string;

    declare refreshToken?: RefreshTokenModel;
}

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registerDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: dataBase,
        tableName: 'Users',
        timestamps: false,
        indexes: [
            { unique: true, fields: ['email'] }
        ]
    }
)

export default UserModel;