import { dataBase } from "./../config/db.js";
import { DataTypes, Model, Optional } from "sequelize";

interface AppointmentTimeAttributes {
    id: number;
    appointmentTime: string;
}

interface AppointmentTimeCreationAttributes extends Optional<AppointmentTimeAttributes, 'id'> { }

class AppointmentTimeModel extends Model<AppointmentTimeAttributes, AppointmentTimeCreationAttributes> {
    declare id: number;
    declare appointmentTime: string;
}

AppointmentTimeModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey: true
        },
        appointmentTime: {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        sequelize: dataBase,
        tableName: 'AppointmentTimes',
        timestamps: false
    }
);

export default AppointmentTimeModel;