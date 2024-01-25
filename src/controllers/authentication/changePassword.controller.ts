import { Request, Response } from "express";
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";
import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { ObjectResponse } from "types/authentication/authentication.types";
import { IGetUserService } from "../../interfaces/services/authentication/getUsers.interface";
import { User } from "models/authentication/user";

export class ChangePassworController implements IController {
  constructor(private readonly getUserService: IGetUserService) {}

  public async handle(
    httpRequest: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    httpResponse: Response,
  ): Promise<ObjectResponse<unknown>> {
    const { email } = httpRequest.body;

    const user = (await this.getUserService.getUserByEmail(email)) as User;

    const pathRecoverPassword = "/change-password/";
    const kafkaProducer = new KafkaSendMessage();

    kafkaProducer.execute("notification-email-change-password", {
      url: pathRecoverPassword,
      email: email,
      payloadJwt: {
        userId: user.id,
        exp: Math.floor(Date.now() / 1000) + 3600 * 60,
      },
    });

    return {
      statusCode: 200,
      body: "Verifique seu email para trocar sua senha.",
    };
  }
}
