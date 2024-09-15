import { DataTypes, Model, Optional } from "sequelize";
import { dataBase } from "./../config/db.js";

interface RefreshTokenAttributes {
    id: string;
    userID: string;
    refreshToken: string;
    version : number;
    expiresAt: Date;
}

interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'version'> { }

class RefreshTokenModel extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
    declare id: string;
    declare userID: string;
    declare refreshToken: string;
    declare version : number;
    declare expiresAt: Date;
}

RefreshTokenModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        version : {
            type : DataTypes.INTEGER,
            defaultValue : 1
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize: dataBase,
        tableName: 'refreshTokens',
        timestamps: false
    }
);

export default RefreshTokenModel;