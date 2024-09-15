import defineAssociations from './setup/associations.js';
import insertServices from './setup/insertServices.js';
import insertTimeOfAppointments from './setup/insertTimeOfAppointments.js';
import insertStatusOfAppointment from './setup/insertStatusOfAppointment.js';
import './setup/initialJobs.js';

export default async function runStartupFunctions() {
    defineAssociations();
    await insertTimeOfAppointments();
    await insertStatusOfAppointment();
    await insertServices();
}