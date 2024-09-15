import AppointmentModel from "../models/appointment";

export default async function deleteOldAppointmentsTask() {
    const appointments : AppointmentModel[] = await AppointmentModel.findAll();
    appointments.forEach(async appointment => {
        if(new Date(appointment.appointmentDate).getTime() < Date.now()){
            await appointment.destroy();
        }
    });
}