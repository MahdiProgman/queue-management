import AppointmentTimeModel from "./../models/appointmentTime.js";

const initialAppointmentTimes = [
    { appointmentTime : '10:00:00'},
    { appointmentTime : '12:00:00'},
    { appointmentTime : '14:00:00'},
    { appointmentTime : '16:00:00'},
    { appointmentTime : '18:00:00'},
    { appointmentTime : '20:00:00'}
];

export default async function insertTimeOfAppointments() : Promise<void> {
    const count = await AppointmentTimeModel.count();

    if(count == 0){
        await AppointmentTimeModel.bulkCreate(initialAppointmentTimes);
        console.log('Initial Appointment Times have been added.');
    }
}