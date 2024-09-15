import AppointmentStatusModel from "../models/appointmentStatus";

const initialAppointmentStatuses = [
    { status: 'Created' },
    { status: 'Reserved' },
    { status: 'InUse' },
    { status: 'Ended' }
];

export default async function insertStatusOfAppointment(): Promise<void> {
    const count: number = await AppointmentStatusModel.count();
    if (count === 0) {
        await AppointmentStatusModel.bulkCreate(initialAppointmentStatuses);
        console.log('Initial Appointment Statuses have been added.');
    }
}