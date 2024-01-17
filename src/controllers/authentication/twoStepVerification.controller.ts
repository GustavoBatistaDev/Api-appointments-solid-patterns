import { Request } from "express";
import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { ObjectResponse } from "../../types/authentication/authentication.types";
import { IDecodeToken } from "interfaces/authentication/decodeToken.interface";
import { payLoadJwt } from "../../types/authentication/payloadJwt.types";
import { IActivateUser } from "../../interfaces/authentication/activateUser.interface";

export class TwoStepVerificationController implements IController {
  constructor(
    private readonly DecodeTokenService: IDecodeToken,
    private readonly activateUserService: IActivateUser,
  ) {}

  public async handle(httpRequest: Request): Promise<ObjectResponse> {
    const queryToken = httpRequest.query.token as string;

    const decoded = this.DecodeTokenService.decodeToken(
      queryToken,
    ) as payLoadJwt;

    if (decoded === null) {
      return {
        statusCode: 400,
        body: "Token expirado ou inválido.",
      };
    }

    await this.activateUserService.activateUser(decoded.userId);

    return {
      statusCode: 200,
      body: "Conta ativada com sucesso.",
    };
  }
}
