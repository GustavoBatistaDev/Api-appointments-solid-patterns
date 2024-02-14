import { IRescheduleAppointmentService } from "interfaces/services/appointments/rescheduleAppointment.interface";
import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import { IRescheduleAppointmentRepository } from "interfaces/repositories/appointments/rescheduleAppointment.interface";

export class RescheduleAppointmentService
  implements IRescheduleAppointmentService
{
  constructor(
    private readonly createAppointmentRepository: IRescheduleAppointmentRepository,
  ) {}
  async rescheduleAppointment(
    id: number,
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO> {
    const appointmentCreated: DataAppointmentDTO =
      await this.createAppointmentRepository.rescheduleAppointment(
        id,
        dataAppointment,
      );

    return appointmentCreated;
  }
}
