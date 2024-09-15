import { DataTypes, Model, Optional } from "sequelize";
import { dataBase } from "../config/db";

interface AppointmentStatusAttributes {
    id : number;
    status : string;
}

interface AppointmentStatusCreationAttributes extends Optional<AppointmentStatusAttributes, 'id'> {}

class AppointmentStatusModel extends Model<AppointmentStatusAttributes, AppointmentStatusCreationAttributes> implements AppointmentStatusAttributes {
    declare id : number;
    declare status: string;
}

AppointmentStatusModel.init(
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        status : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize : dataBase,
        tableName : 'appointmentStatuses',
        timestamps : false
    }
);

export default AppointmentStatusModel;