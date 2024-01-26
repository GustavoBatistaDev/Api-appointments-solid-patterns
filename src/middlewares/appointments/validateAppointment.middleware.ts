import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ValidationResult } from "../../types/authentication/authentication.types";
import { ValidationError } from "joi";
import { IGetAppointmentsService } from "../../interfaces/services/appointments/getAppointments.interface";
import { GetDoctorBySpecialtyService } from "../../services/appointments/getDoctorsBySpecialty.service";
import { DoctorObject } from "../../types/appointments/doctor.type";

export class CreateAppointmentValidatorMiddleware {
  constructor(
    private readonly joiSchema: Schema,
    private readonly getAppointmentsService: IGetAppointmentsService,
    private readonly getDoctorBySpecialtyService: GetDoctorBySpecialtyService,
  ) {}

  public validateDataCreateAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationResult> => {
    try {
      await this.joiSchema.validateAsync(req.body);

      const doctor: DoctorObject =
        await this.getDoctorBySpecialtyService.getDoctorsBySpecialty(
          req.body.especialidades_id,
        );

      const appointmentsExists =
        await this.getAppointmentsService.getAppointmentByHourAndDoctorAndDate(
          req.body.dia,
          req.body.horas,
          doctor.id,
        );

      if (!appointmentsExists) {
        next();
        return;
      }
      return res.status(400).json({
        message: "Já existe um agendamento nesse dia e horário. Escolha outro.",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
    }
  };
}
