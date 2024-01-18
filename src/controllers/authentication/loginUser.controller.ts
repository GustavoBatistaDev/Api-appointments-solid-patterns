import { Request } from "express";

import { ObjectResponse } from "../../types/authentication/authentication.types";
import { IController } from "../../interfaces/global/controllers/controllerProtocol.interface";
import { ResponseLogin } from "types/authentication/responseLogin.types";
import { LoginUserService } from "../../services/authentication/loginUser.service";
import { payLoadJwt } from "../../types/authentication/payloadJwt.types";
import { User } from "models/authentication/user";
import { IComparePasswordService } from "../../interfaces/authentication/comparePasswordService.interface";

export class LoginUserController implements IController {
  constructor(
    private readonly loginUserService: LoginUserService,
    private readonly comparePasswordService: IComparePasswordService,
  ) {}

  public async handle(
    httpRequest: Request,
  ): Promise<ObjectResponse<ResponseLogin | ObjectResponse>> {
    if (!httpRequest.body || Object.keys(httpRequest.body).length === 0) {
      return {
        statusCode: 400,
        body: "Email e senha são requeridos.",
      };
    }
    const secretKeyJwt = process.env.JWT_SECRETY_KEY;

    if (!secretKeyJwt) {
      throw new Error("Chave secreta não definida");
    }

    const user: User | null = await this.loginUserService.getUserByEmail(
      httpRequest.body.email,
    );

    if (user) {
      const userAuthenticated: null | User =
        await this.loginUserService.authenticate(
          httpRequest.body.email,
          httpRequest.body.password,
          user.password,
        );
      if (userAuthenticated) {
        const payload: payLoadJwt = {
          userId: userAuthenticated.id,
          exp: Math.floor(Date.now() / 1000) + 3600 * 60,
        };

        const token = this.loginUserService.genereteJwtToken(
          payload,
          secretKeyJwt,
        );

        return {
          statusCode: 200,
          body: { user: userAuthenticated, token },
        };
      }
    }

    return {
      statusCode: 400,
      body: "Email ou senha inválidos",
    };
  }
}
