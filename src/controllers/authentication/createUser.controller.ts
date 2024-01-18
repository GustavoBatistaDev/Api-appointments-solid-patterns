import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { IsendMail } from "../../interfaces/global/email/sendMail.interface";

import { ICreateUserService } from "interfaces/services/authentication/ICreateUser.interface";

import { User } from "models/authentication/user";
import { Request } from "express";
import { ObjectResponse } from "../../types/authentication/authentication.types";
import { ICreateTokenJwtService } from "interfaces/authentication/createToken.interface";

export class CreateUserController implements IController {
  constructor(
    private readonly createUserService: ICreateUserService,
    private readonly sendMailService: IsendMail,
    private readonly createTokenJwtService: ICreateTokenJwtService,
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

    const token = this.createTokenJwtService.createToken(
      {
        userId: body.id,
        exp: Math.floor(Date.now() / 1000) + 3600 * 60,
      },
      secretKeyJwt,
    );

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
