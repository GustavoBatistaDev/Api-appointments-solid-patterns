import { IController } from "interfaces/global/controllers/controllerProtocol.interface";

import { ICreateUserService } from "interfaces/services/authentication/ICreateUser.interface";

import { User } from "models/authentication/user";
import { Request, Response } from "express";
import { ObjectResponse } from "../../types/authentication/authentication.types";

import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

export class CreateUserController implements IController {
  constructor(private readonly createUserService: ICreateUserService) {}

  public async handle(
    httpRequest: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    httpResponse: Response,
  ): Promise<ObjectResponse<User>> {
    if (!httpRequest.body) {
      return {
        statusCode: 400,
        body: "Body is required.",
      };
    }

    const body: User = await this.createUserService.createUser(
      httpRequest.body,
    );

    const secretKeyJwt = process.env.JWT_SECRETY_KEY;

    if (!secretKeyJwt) {
      throw new Error("Chave secreta não definida");
    }

    const kafkaProducer = new KafkaSendMessage();

    kafkaProducer.execute("notification-email", {
      email: body.email,
      url: "/api/verify-email",
      payloadJwt: {
        userId: body.id,
        exp: Math.floor(Date.now() / 1000) + 3600 * 60,
      },
    });
    return {
      statusCode: 200,
      body,
    };
  }
}
