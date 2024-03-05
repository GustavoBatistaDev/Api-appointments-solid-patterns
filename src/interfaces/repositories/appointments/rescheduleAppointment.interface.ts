import { DataAppointmentDTO } from "../../../types/appointments/appointmentDTO.types";

export interface IRescheduleAppointmentRepository {
  rescheduleAppointment(
    idAppointment: number,
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO>;
}
