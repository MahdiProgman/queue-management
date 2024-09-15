import AppointmentModel from "../models/appointment";
import AppointmentStatusModel from "../models/appointmentStatus";
import AppointmentTimeModel from "../models/appointmentTime";
import ServiceModel from "../models/service";


export const getListOfAppointmentTime = async (): Promise<AppointmentTimeModel[]> => {
    const result : AppointmentTimeModel[] = await AppointmentTimeModel.findAll();
    return result;
}

export const createAppointmentsWithTimes =  async (serviceID: string, date : Date): Promise<void> => {
    const serviceFound: ServiceModel | null = await ServiceModel.findByPk(serviceID);
    if (serviceFound) {
        const listOfAppointmentTimeId : AppointmentTimeModel[] = await getListOfAppointmentTime();
        const listOfAppointment = [];

        for (let i: number = 0; i < listOfAppointmentTimeId.length; ++i) {
            listOfAppointment.push({
                serviceID: serviceFound.id,
                appointmentTimeId: listOfAppointmentTimeId[i].id,
                appointmentStatusId : 1,
                appointmentDate: date.toString()
            });
        }

        await AppointmentModel.bulkCreate(listOfAppointment);
    }
}