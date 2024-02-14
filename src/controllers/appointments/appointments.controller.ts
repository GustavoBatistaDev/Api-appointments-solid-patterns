import { IController } from "interfaces/global/controllers/controllerProtocol.interface";

import { Request, Response } from "express";

import * as schedule from "node-schedule";

import { ObjectResponse } from "../../types/authentication/authentication.types";

import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

import { ICreateAppointmentService } from "../../interfaces/services/appointments/createAppointment.interface";
import { GetDoctorBySpecialtyService } from "../../services/appointments/getDoctorsBySpecialty.service";
import { DataAppointmentDTO } from "../../types/appointments/appointmentDTO.types";
import {
  IGetAppointmentsFromPatientService,
  IGetAppointmentsService,
} from "../../interfaces/services/appointments/getAppointments.interface";
import { formatDate } from "../../utils/formatDate.utils";
import { parseDateTime } from "../../utils/parseDateTime.utils";
import { IRescheduleAppointmentService } from "../../interfaces/services/appointments/rescheduleAppointment.interface";
import { DoctorObject } from "../../types/appointments/doctor.type";

export class CreateAppointmentController implements IController {
  constructor(
    private readonly createAppointmentService: ICreateAppointmentService,
    private readonly getDoctorBySpecialtyService: GetDoctorBySpecialtyService,
    private readonly getAppointmentsService: IGetAppointmentsService,
  ) {}
  public async handle(
    httpRequest: Request,
    httpResponse: Response,
  ): Promise<ObjectResponse<DataAppointmentDTO>> {
    const body = httpRequest.body;

    body.pacientes_id = httpResponse.locals.user.id;

    console.log(httpResponse.locals.user.id);

    const doctor = await this.getDoctorBySpecialtyService.getDoctorsBySpecialty(
      body.especialidades_id,
    );

    body.doutores_id = doctor.id;

    body.status = "pendente";

    const appointmentCreated =
      await this.createAppointmentService.createAppointment(body);

    const appointmendJoined =
      await this.getAppointmentsService.getAppointmentById(
        appointmentCreated.id as number,
      );

    const datePostgres = new Date(appointmendJoined.dia);

    const formattedDate = formatDate(datePostgres);

    const kafkaProducer = new KafkaSendMessage();
    kafkaProducer.execute("notification-whatsapp", {
      phone: httpResponse.locals.user.numero_celular.trim(),
      message: `Olá, Sr(a) ${httpResponse.locals.user.nome} ${httpResponse.locals.user.ultimo_nome}. Informamos que o seu atendimento está confirmado para a data ${formattedDate}, às ${appointmendJoined.horas}h com Dr(a) ${appointmendJoined.nomeDoutor} na Unidade +SaudeClinic em Eunápolis. Por gentileza, chegar 30 min antes do horário com a carteira do convênio, (caso particular o valor a consulta) RG, CPF. Lembramos que enviaremos um lembrete 1 dia antes da consulta. Até lá.`,
    });

    const DateAppointment = parseDateTime({
      day: body.dia,
      hour: appointmendJoined.horas,
    });

    schedule.scheduleJob(DateAppointment, () => {
      kafkaProducer.execute("notification-whatsapp", {
        phone: httpResponse.locals.user.numero_celular.trim(),
        message: `Olá, Sr(a) ${httpResponse.locals.user.nome} ${httpResponse.locals.user.ultimo_nome}. Estou aqui para lembrá-lo(a) da sua consulta com o ${appointmendJoined.nomeEspecialidade} amanhã às ${appointmendJoined.horas}h com Dr(a) ${appointmendJoined.nomeDoutor}.`,
      });
    });

    return {
      statusCode: 200,
      body: appointmentCreated,
    };
  }
}

export class RescheduleAppointmentController implements IController {
  constructor(
    private readonly rescheduleAppointmentService: IRescheduleAppointmentService,
    private readonly getAppointmentsService: IGetAppointmentsService,
    private readonly getDoctorBySpecialtyService: GetDoctorBySpecialtyService,
  ) {}

  public async handle(
    httpRequest: Request,
    httpResponse: Response,
  ): Promise<ObjectResponse<DataAppointmentDTO>> {
    const { id } = httpRequest.params;

    const body = httpRequest.body;

    const doctor: DoctorObject =
      await this.getDoctorBySpecialtyService.getDoctorsBySpecialty(
        body.especialidades_id,
      );

    body.doutores_id = doctor.id;

    const appointmentRescheduled =
      await this.rescheduleAppointmentService.rescheduleAppointment(
        Number(id),
        body,
      );

    const datePostgres = new Date(appointmentRescheduled.dia);

    const formattedDate = formatDate(datePostgres);

    const appointmendJoined =
      await this.getAppointmentsService.getAppointmentById(
        appointmentRescheduled.id as number,
      );

    const kafkaProducer = new KafkaSendMessage();
    kafkaProducer.execute("notification-whatsapp", {
      phone: httpResponse.locals.user.numero_celular.trim(),
      message: `Olá, Sr(a) ${httpResponse.locals.user.nome} ${httpResponse.locals.user.ultimo_nome}. Informamos que o seu atendimento foi remarcado para a data ${formattedDate}, às ${appointmendJoined.horas}h com Dr(a) ${appointmendJoined.nomeDoutor} na Unidade +SaudeClinic em Eunápolis. Por gentileza, chegar 30 min antes do horário com a carteira do convênio, (caso particular o valor a consulta) RG, CPF. Lembramos que enviaremos um lembrete 1 dia antes da consulta. Até lá.`,
    });

    const DateAppointment = parseDateTime({
      day: body.dia,
      hour: appointmendJoined.horas,
    });

    schedule.scheduleJob(DateAppointment, () => {
      kafkaProducer.execute("notification-whatsapp", {
        phone: httpResponse.locals.user.numero_celular.trim(),
        message: `Olá, Sr(a) ${httpResponse.locals.user.nome} ${httpResponse.locals.user.ultimo_nome}. Estou aqui para lembrá-lo(a) da sua consulta com o ${appointmendJoined.nomeEspecialidade} amanhã às ${appointmendJoined.horas}h com Dr(a) ${appointmendJoined.nomeDoutor}.`,
      });
    });

    return {
      statusCode: 200,
      body: appointmentRescheduled,
    };
  }
}

export class GetAppointmentsController implements IController {
  constructor(
    private readonly getAppointmentsFromPatientService: IGetAppointmentsFromPatientService,
  ) {}

  public async handle(
    httpRequest: Request,
    httpResponse: Response,
  ): Promise<ObjectResponse<unknown>> {
    const appointments =
      await this.getAppointmentsFromPatientService.getAppointmentsFromPatient(
        httpResponse.locals.user.id,
      );

    return {
      statusCode: 200,
      body: appointments,
    };
  }
}
