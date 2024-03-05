import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import { ICreateAppointment } from "../../interfaces/repositories/appointments/createAppointment.interface";
import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";

const knexInstance: Knex = DatabaseSingleton.getInstance();
export class CreateAppointmentRepository
  implements ICreateAppointment
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
