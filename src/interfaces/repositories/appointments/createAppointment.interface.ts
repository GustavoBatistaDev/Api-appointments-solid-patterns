import { DataAppointmentDTO } from "../../../types/appointments/appointmentDTO.types";

export interface ICreateAppointment {
  createAppointment(
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO>;
}
