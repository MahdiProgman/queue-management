import AppointmentModel from "../models/appointment";
import AppointmentTimeModel from "../models/appointmentTime"
import ServiceModel from "../models/service";
import { createAppointmentsWithTimes } from "../services/appointment.service";

export default async function createAppointmentsTask(days : number): Promise<void> {
    const listOfServiceID : ServiceModel[] = await ServiceModel.findAll({
        attributes : ['id']
    });
    
    let date : Date = new Date();
    
    for(let i : number = 0;i < days;++i){
        for(let i = 0; i < listOfServiceID.length; ++i){
            await createAppointmentsWithTimes(listOfServiceID[i].dataValues.id, date);
        }
        date.setDate(date.getDate() + 1);
    }

    console.log('Appointments Created Today :', new Date());
}