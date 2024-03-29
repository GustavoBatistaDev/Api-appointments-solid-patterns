import { DataJoinnedAppointment } from "../../../types/appointments/appointmentDTO.types";

export interface IGetAppointments {
  getAppointmentByHourAndDoctorAndDate(
    day: string,
    hour: string,
    doctor_id: number,
  ): Promise<boolean>;

  getAppointmentById(appointmentId: number): Promise<DataJoinnedAppointment>;
}

export interface IGetAppointmentsFromPatient {
  getAppointmentsFromPatient(
    patientId: number,
    start?: number,
    limit?: number,
  ): Promise<DataJoinnedAppointment[]>;
}
