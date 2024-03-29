import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import { ICreateAppointment } from "../../interfaces/repositories/appointments/createAppointment.interface";

export class CreateAppointmentService implements ICreateAppointment {
  constructor(
    private readonly createAppointmentRepository: ICreateAppointment,
  ) {}
  async createAppointment(
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO> {
    const appointmentCreated =
      await this.createAppointmentRepository.createAppointment(dataAppointment);
    return appointmentCreated;
  }
}
