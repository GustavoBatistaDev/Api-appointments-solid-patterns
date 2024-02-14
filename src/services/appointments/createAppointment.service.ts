import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import { ICreateAppointmentRepository } from "../../interfaces/repositories/appointments/createAppointment.interface";
import { ICreateAppointmentService } from "../../interfaces/services/appointments/createAppointment.interface";

export class CreateAppointmentService implements ICreateAppointmentService {
  constructor(
    private readonly createAppointmentRepository: ICreateAppointmentRepository,
  ) {}
  async createAppointment(
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO> {
    const appointmentCreated =
      await this.createAppointmentRepository.createAppointment(dataAppointment);

    return appointmentCreated;
  }
}
