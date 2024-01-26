import { IGetDoctorBySpecialtyRepository } from "../../interfaces/repositories/appointments/getDoctorsBySpecialty.interface";
import { IGetDoctorBySpecialtyService } from "../../interfaces/services/appointments/getDoctorsBySpecialty.interface";
import { DoctorObject } from "../../types/appointments/doctor.type";

export class GetDoctorBySpecialtyService
  implements IGetDoctorBySpecialtyService
{
  constructor(
    private readonly getDoctorBySpecialtyRepository: IGetDoctorBySpecialtyRepository,
  ) {}
  async getDoctorsBySpecialty(specialty_id: number) {
    const doctor: DoctorObject =
      await this.getDoctorBySpecialtyRepository.getDoctorsBySpecialty(
        specialty_id,
      );

    return doctor;
  }
}
