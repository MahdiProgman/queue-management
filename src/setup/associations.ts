import UserModel from "./../models/user.js";
import AppointmentModel from "./../models/appointment.js";
import ServiceModel from "./../models/service.js";
import AppointmentTimeModel from "./../models/appointmentTime.js";
import RefreshTokenModel from "./../models/refreshToken.js";
import AppointmentStatusModel from "../models/appointmentStatus.js";

export default function defineAssociations(){
    // User To Appointment Relationship
    UserModel.hasMany(AppointmentModel, {
        foreignKey : 'userID',
        as : 'appointments'
    });
    AppointmentModel.belongsTo(UserModel, {
        foreignKey : 'userID',
        foreignKeyConstraint : true,
        as : 'user',
    });
    
    // Service To Appointment Relationship
    ServiceModel.hasMany(AppointmentModel, {
        foreignKey : 'serviceID',
        as : 'services'
    });
    AppointmentModel.belongsTo(ServiceModel, {
        foreignKey : 'serviceID',
        as : 'service'
    });
    
    // AppointmentTime To Appointment Relationship
    AppointmentTimeModel.hasMany(AppointmentModel, {
        foreignKey : 'appointmentTimeId',
        as : 'appointments'
    });
    AppointmentModel.belongsTo(AppointmentModel, {
        foreignKey : 'appointmentTimeId',
        as : 'appointmentTime'
    });

    // User To RefreshToken Relationship
    UserModel.hasOne(RefreshTokenModel, {
        foreignKey : 'userID',
        as : 'refreshToken'
    });
    RefreshTokenModel.belongsTo(UserModel, {
        foreignKey : 'userID',
        as : 'user'
    });

    // Appointment To AppointmentStatus Relationship
    AppointmentStatusModel.hasMany(AppointmentModel, {
        foreignKey : 'appointmentStatusId',
        as : 'appointments'
    });
    AppointmentModel.belongsTo(AppointmentStatusModel, {
        foreignKey : 'appointmentStatusId',
        as : 'appointmentStatus'
    })
}