import { IController } from "interfaces/global/controllers/controllerProtocol.interface";

import { Request, Response } from "express";

import { ObjectResponse } from "../../types/authentication/authentication.types";

import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

import { ICreateAppointmentService } from "../../interfaces/services/appointments/createAppointment.interface";
import { GetDoctorBySpecialtyService } from "../../services/appointments/getDoctorsBySpecialty.service";
import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import { IGetAppointmentsService } from "../../interfaces/services/appointments/getAppointments.interface";

export class CreateAppointmentController implements IController {
  constructor(
    private readonly createAppointmentService: ICreateAppointmentService,
    private readonly getDoctorBySpecialtyService: GetDoctorBySpecialtyService,
    private readonly getAppointmentsRepository: IGetAppointmentsService,
  ) {}
  public async handle(
    httpRequest: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    httpResponse: Response,
  ): Promise<ObjectResponse<DataAppointmentDTO>> {
    const body = httpRequest.body;

    body.pacientes_id = httpResponse.locals.user.id;

    const doctor = await this.getDoctorBySpecialtyService.getDoctorsBySpecialty(
      body.especialidades_id,
    );

    body.doutores_id = doctor.id;

    body.status = "pendente";

    const appointmentCreated =
      await this.createAppointmentService.createAppointment(body);

    const appointmendJoined =
      await this.getAppointmentsRepository.getAppointmentById(
        appointmentCreated.id as number,
      );

    const addLeadingZero = (value: number): string =>
      value < 10 ? `0${value}` : `${value}`;

    // Function to format the date
    const formatDate = (date: Date): string => {
      const day = addLeadingZero(date.getDate());
      const month = addLeadingZero(date.getMonth() + 1); // Months in JavaScript are zero-based
      const year = date.getFullYear();
      const hours = addLeadingZero(date.getHours());
      const minutes = addLeadingZero(date.getMinutes());
      const seconds = addLeadingZero(date.getSeconds());

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    // Usage
    const dataDoPostgres = new Date("2024-02-13T00:00:00.000Z");
    const formattedDate = formatDate(dataDoPostgres);
    const kafkaProducer = new KafkaSendMessage();
    kafkaProducer.execute("notification-whatsapp", {
      phone: httpResponse.locals.user.numero_celular.trim(),
      message: `Olá, Sr(a) ${httpResponse.locals.user.nome} ${httpResponse.locals.user.ultimo_nome}. Informamos que o seu atendimento está confirmado para a data ${formattedDate}, às ${appointmendJoined.horas}h com Dr(a) ${appointmendJoined.nomeDoutor} na Unidade +SaudeClinic em Eunápolis. Por gentileza, chegar 30 min antes do horário com a carteira do convênio, (caso particular o valor a consulta) RG, CPF. Lembramos que enviaremos um lembrete 1 dia antes da consulta. Até lá.`,
    });

    return {
      statusCode: 200,
      body: appointmentCreated,
    };
  }
}
