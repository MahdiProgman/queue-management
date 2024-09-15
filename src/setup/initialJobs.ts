import schedule from 'node-schedule';
import createAppointmentsTask from '../tasks/createAppointments';
import deleteExpiredTokenTask from '../tasks/deleteExpiredRefreshToken';
import deleteOldAppointmentsTask from '../tasks/deleteOldAppointments';

export const createAppointmentJob: schedule.Job = schedule.scheduleJob("*/5 * * * * *", async () => {
    await createAppointmentsTask(7);
});

export const deleteExpiredTokenJob: schedule.Job = schedule.scheduleJob("0 * * * *", deleteExpiredTokenTask);

export const deleteOldAppointmentsJob: schedule.Job = schedule.scheduleJob("0 * 0 * * 6", deleteOldAppointmentsTask);