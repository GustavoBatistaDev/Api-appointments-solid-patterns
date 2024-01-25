import { Request, Response } from "express";

import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { IUpdatePasswordService } from "interfaces/services/authentication/updatePasswordService.interface";
import { ObjectResponse } from "../../types/authentication/authentication.types";
import { IEncryptorPasswordService } from "../../interfaces/authentication/encryptorPassword.interface";

export class AlterPassworController implements IController {
  constructor(
    private readonly updatePasswordService: IUpdatePasswordService,
    private readonly encryptorPasswordService: IEncryptorPasswordService,
  ) {}

  public async handle(
    httpRequest: Request,
    httpResponse: Response,
  ): Promise<ObjectResponse<unknown>> {
    const { password } = httpRequest.body;

    const passwordEncrypted =
      await this.encryptorPasswordService.encryptorPassword(password);

    const id = httpResponse.locals.userId;
    await this.updatePasswordService.updatePassword(id, passwordEncrypted);

    return {
      statusCode: 200,
      body: "Senha alterada com sucesso.",
    };
  }
}
