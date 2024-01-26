import { DoctorObject } from "../../../types/appointments/doctor.type";

export interface IGetDoctorBySpecialtyRepository {
  getDoctorsBySpecialty(specialty_id: number): Promise<DoctorObject>;
}
