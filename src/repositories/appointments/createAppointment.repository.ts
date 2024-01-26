import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import { ICreateAppointmentRepository } from "../../interfaces/repositories/appointments/createAppointment.repository";
import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();
export class CreateAppointmentRepository
  implements ICreateAppointmentRepository
{
  async createAppointment(
    dataAppointment: DataAppointmentDTO,
  ): Promise<DataAppointmentDTO> {
    const appointmentCreated: DataAppointmentDTO = await knexInstance(
      "agendamentos",
    )
      .insert({
        ...dataAppointment,
      })
      .returning("*")
      .then((result: DataAppointmentDTO[]) => result[0]);

    return appointmentCreated;
  }
}
