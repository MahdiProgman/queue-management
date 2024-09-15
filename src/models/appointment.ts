import { dataBase } from "./../config/db.js";
import { Model, DataTypes, Optional } from "sequelize";

interface AppointmentAttributes {
    id: string;
    serviceID: string;
    userID: string;
    appointmentTimeId: number;
    appointmentStatusId: number;
    appointmentDate: string;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id' | 'appointmentDate' | 'userID'> { }

class AppointmentModel extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
    declare id: string;
    declare serviceID: string;
    declare userID: string;
    declare appointmentTimeId: number;
    declare appointmentStatusId: number;
    declare appointmentDate: string;
}

AppointmentModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            primaryKey: true
        },
        serviceID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        userID: {
            type: DataTypes.UUID,
            defaultValue : null
        },
        appointmentTimeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        appointmentStatusId: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        appointmentDate: {
            type: DataTypes.DATEONLY,
            defaultValue : DataTypes.NOW
        }
    },
    {
        sequelize: dataBase,
        tableName: 'Appointments',
        timestamps: false
    }
);

export default AppointmentModel;