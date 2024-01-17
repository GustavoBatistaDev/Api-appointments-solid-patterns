import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { IsendMail } from "../../interfaces/global/email/sendMail.interface";

import { ICreateUserService } from "interfaces/services/authentication/ICreateUser.service";

import { User } from "models/authentication/user";
import { Request } from "express";
import { ObjectResponse } from "../../types/authentication/authentication.types";
import { ICreateTokenJwt } from "interfaces/authentication/createToken.interface";

export class CreateUserController implements IController {
  constructor(
    private readonly createUserService: ICreateUserService,
    private readonly sendMailService: IsendMail,
    private readonly createTokenJwt: ICreateTokenJwt,
  ) {}

  public async handle(httpRequest: Request): Promise<ObjectResponse<User>> {
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

    const token = this.createTokenJwt.createToken(
      { userId: body.id },
      secretKeyJwt,
      "8h",
    );

    console.log(token);

    this.sendMailService.sendMessage(
      body.email,
      "Ativação de conta",
      `${process.env.SERVER_EXPRESS_PROTOCOL}://${process.env.SERVER_EXPRESS_HOST}:${process.env.SERVER_EXPRESS_PORT}/verify-email?token=${token}`,
    );

    return {
      statusCode: 200,
      body,
    };
  }
}
