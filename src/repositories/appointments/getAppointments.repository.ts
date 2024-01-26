import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import { DataAppointmentDTO, DataJoinnedAppointment } from "../../types/appointments/appointmentDTO.types";
import { IGetAppointmentsRepository } from "../../interfaces/repositories/appointments/getAppointments.interface";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class GetAppointmentsRepository implements IGetAppointmentsRepository {
  public async getAppointmentByHourAndDoctorAndDate(
    day: string,
    hour: string,
    doctor_id: number,
  ): Promise<boolean> {
    const appointmentExists = await knexInstance("agendamentos")
      .where({
        dia: day,
        horas: hour,
        doutores_id: doctor_id,
      })
      .then((result: DataAppointmentDTO[]) => result[0]);

    return appointmentExists ? true : false;
  }
  public async getAppointmentById(
    appointmentId: number,
  ): Promise<DataJoinnedAppointment> {
    const appointment = await knexInstance("agendamentos")
      .select(
        "agendamentos.*",
        "pacientes.nome as nomePaciente",
        "doutores.nome as nomeDoutor",
        "especialidades.nome as nomeEspecialidade",
      )
      .where("agendamentos.id", appointmentId)
      .join("doutores", "agendamentos.doutores_id", "=", "doutores.id")
      .join(
        "especialidades",
        "agendamentos.especialidades_id",
        "=",
        "especialidades.id",
      )
      .join("pacientes", "agendamentos.pacientes_id", "=", "pacientes.id")
      .first();

    return appointment;
  }
}
