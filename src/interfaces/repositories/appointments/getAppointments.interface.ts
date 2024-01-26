import { DataJoinnedAppointment } from "../../../types/appointments/appointmentDTO.types";

export interface IGetAppointmentsRepository {
  getAppointmentByHourAndDoctorAndDate(
    day: string,
    hour: string,
    doctor_id: number,
  ): Promise<boolean>;

  getAppointmentById(appointmentId: number): Promise<DataJoinnedAppointment>;
}
