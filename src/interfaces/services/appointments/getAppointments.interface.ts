import {
  IGetAppointmentsFromPatientRepository,
  IGetAppointmentsRepository,
} from "../../../interfaces/repositories/appointments/getAppointments.interface";

export interface IGetAppointmentsService extends IGetAppointmentsRepository {}

export interface IGetAppointmentsFromPatientService
  extends IGetAppointmentsFromPatientRepository {}
