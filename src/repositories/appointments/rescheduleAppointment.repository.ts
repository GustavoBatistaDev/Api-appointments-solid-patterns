import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";

import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import { IRescheduleAppointmentRepository } from "../../interfaces/repositories/appointments/rescheduleAppointment.interface";

const knexInstance: Knex = DatabaseSingleton.getInstance();
export class RescheduleAppointmentRepository
  implements IRescheduleAppointmentRepository
{
  async rescheduleAppointment(
    id: number,
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO> {
    const appointmentRescheduled: DataAppointmentDTO = await knexInstance(
      "agendamentos",
    )
      .update({
        ...dataAppointment,
      })
      .where({ id })
      .returning("*")
      .then((result: DataAppointmentDTO[]) => result[0]);

    return appointmentRescheduled;
  }
}
