import { dataBase } from "./../config/db.js";
import { DataTypes, Model, Optional } from "sequelize";

interface ServiceAttributes {
    id: string;
    serviceName: string;
    duration: number;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> { }

class ServiceModel extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
    declare id: string;
    declare serviceName: string;
    declare duration: number;
}

ServiceModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: dataBase,
        tableName: 'Services',
        timestamps: false
    }
);

export default ServiceModel;