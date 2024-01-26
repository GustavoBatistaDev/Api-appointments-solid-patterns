import { DataAppointmentDTO } from "../../../types/appointments/appointmentDTO.types";

export interface ICreateAppointmentRepository {
  createAppointment(
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO>;
}
