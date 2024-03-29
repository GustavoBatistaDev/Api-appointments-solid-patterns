import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import {
  DataAppointmentDTO,
  DataJoinnedAppointment,
} from "../../types/appointments/appointmentDTO.types";
import {
  IGetAppointmentsFromPatient,
  IGetAppointments,
} from "../../interfaces/repositories/appointments/getAppointments.interface";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class GetAppointmentsRepository implements IGetAppointments {
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

export class GetAppointmentsFromPatientRepository
  implements IGetAppointmentsFromPatient
{
  public async getAppointmentsFromPatient(
    pacientId: number,
    start?: number,
    limit?: number,
  ): Promise<DataJoinnedAppointment[]> {
    const appointment: DataJoinnedAppointment[] = await knexInstance(
      "agendamentos",
    )
      .select(
        "agendamentos.*",
        "pacientes.nome as nomePaciente",
        "doutores.nome as nomeDoutor",
        "especialidades.nome as nomeEspecialidade",
      )
      .where("agendamentos.pacientes_id", pacientId)
      .join("doutores", "agendamentos.doutores_id", "=", "doutores.id")
      .join(
        "especialidades",
        "agendamentos.especialidades_id",
        "=",
        "especialidades.id",
      )
      .join("pacientes", "agendamentos.pacientes_id", "=", "pacientes.id")
      .offset(start || 0)
      .limit(limit || 1000);

    return appointment;
  }
}
