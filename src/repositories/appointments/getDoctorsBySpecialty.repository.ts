import { Knex } from "knex";

import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import { DoctorObject } from "../../types/appointments/doctor.type";
import { IGetDoctorBySpecialtyRepository } from "../../interfaces/repositories/appointments/getDoctorsBySpecialty.interface";

const knexInstance: Knex = DatabaseSingleton.getInstance();
export class GetDoctorBySpecialtyRepository
  implements IGetDoctorBySpecialtyRepository
{
  async getDoctorsBySpecialty(specialty_id: number) {
    const doctor: DoctorObject = await knexInstance("doutores")
      .where({
        especialidades_id: specialty_id,
      })
      .then((result: DoctorObject[]) => result[0]);

    return doctor;
  }
}
