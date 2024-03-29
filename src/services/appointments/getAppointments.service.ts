import { DataJoinnedAppointment } from "../../types/appointments/appointmentDTO.types";

import {
  IGetAppointments,
  IGetAppointmentsFromPatient,
} from "../../interfaces/repositories/appointments/getAppointments.interface";

export class GetAppointmentsService implements IGetAppointments {
  constructor(private readonly getAppointmentsRepository: IGetAppointments) {}
  public async getAppointmentByHourAndDoctorAndDate(
    day: string,
    hour: string,
    doctor_id: number,
  ): Promise<boolean> {
    const appointmentExists =
      await this.getAppointmentsRepository.getAppointmentByHourAndDoctorAndDate(
        day,
        hour,
        doctor_id,
      );
    return appointmentExists ? true : false;
  }

  public async getAppointmentById(
    appointmentId: number,
  ): Promise<DataJoinnedAppointment> {
    const appointment =
      await this.getAppointmentsRepository.getAppointmentById(appointmentId);
    return appointment;
  }
}

export class GetAppointmentsFromPatientService
  implements IGetAppointmentsFromPatient
{
  constructor(
    private readonly getAppointmentsFromPatientRepository: IGetAppointmentsFromPatient,
  ) {}
  public async getAppointmentsFromPatient(
    patientId: number,
    start: number,
    limit: number,
  ): Promise<DataJoinnedAppointment[]> {
    const appointments =
      await this.getAppointmentsFromPatientRepository.getAppointmentsFromPatient(
        patientId,
        start,
        limit,
      );
    return appointments;
  }
}
