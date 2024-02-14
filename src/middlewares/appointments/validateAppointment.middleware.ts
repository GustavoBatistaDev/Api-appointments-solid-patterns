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

  public validateAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationResult> => {
    try {
      const { id } = req.params;

      if (id) {
        if (isNaN(Number(id))) {
          return res.status(400).json({
            message: "Id precisa ser numérico.",
          });
        }
        const appointment =
          await this.getAppointmentsService.getAppointmentById(Number(id));

        if (!appointment) {
          return res.status(400).json({
            message: "Não existe um agendamento para o id informado.",
          });
        }
      }

      await this.joiSchema.validateAsync(req.body);

      if (this.validateDateIsValid(req.body.dia)) {
        console.log(this.validateDateIsValid(req.body.dia));
        return res.status(400).json({
          message: "Escolha uma data futura.",
        });
      }
      const doctor: DoctorObject =
        await this.getDoctorBySpecialtyService.getDoctorsBySpecialty(
          req.body.especialidades_id,
        );

      const appointmentsAlreadyExists =
        await this.getAppointmentsService.getAppointmentByHourAndDoctorAndDate(
          req.body.dia,
          req.body.horas,
          doctor.id,
        );

      if (!appointmentsAlreadyExists) {
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

  public validateDateIsValid = (date: string) => {
    const currentDate: Date = new Date();
    const objectDate = new Date(date);

    return objectDate.getTime() < currentDate.getTime();
  };
}
