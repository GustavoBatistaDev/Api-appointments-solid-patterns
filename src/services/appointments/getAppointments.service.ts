import { DataJoinnedAppointment } from "../../types/appointments/appointmentDTO.types";
import {
  IGetAppointmentsFromPatientService,
  IGetAppointmentsService,
} from "../../interfaces/services/appointments/getAppointments.interface";
import {
  IGetAppointmentsFromPatientRepository,
  IGetAppointmentsRepository,
} from "../../interfaces/repositories/appointments/getAppointments.interface";

export class GetAppointmentsService implements IGetAppointmentsService {
  constructor(
    private readonly getAppointmentsRepository: IGetAppointmentsRepository,
  ) {}
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
  implements IGetAppointmentsFromPatientService
{
  constructor(
    private readonly getAppointmentsFromPatientRepository: IGetAppointmentsFromPatientRepository,
  ) {}
  public async getAppointmentsFromPatient(
    patientId: number,
  ): Promise<DataJoinnedAppointment[]> {
    const appointments =
      await this.getAppointmentsFromPatientRepository.getAppointmentsFromPatient(
        patientId,
      );
    return appointments;
  }
}
