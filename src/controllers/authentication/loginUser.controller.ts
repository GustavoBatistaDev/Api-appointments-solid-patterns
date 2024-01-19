import { ObjectResponse } from "../../types/authentication/authentication.types";
import { IController } from "../../interfaces/global/controllers/controllerProtocol.interface";
import { ResponseLogin } from "types/authentication/responseLogin.types";

import { payLoadJwt } from "../../types/authentication/payloadJwt.types";

import { Request } from "../../interfaces/http/httpRequest.interface";
import { ILoginUserService } from "../../interfaces/authentication/loginUser.interface";

export class LoginUserController implements IController {
  constructor(private readonly loginUserService: ILoginUserService) {}

  public async handle(
    httpRequest: Request,
  ): Promise<ObjectResponse<ResponseLogin | ObjectResponse>> {
    const secretKeyJwt = process.env.JWT_SECRETY_KEY;

    if (!secretKeyJwt) {
      throw new Error("Chave secreta não definida");
    }

    const user = httpRequest.user!;

    const payload: payLoadJwt = {
      userId: user.id,
      exp: Math.floor(Date.now() / 1000) + 3600 * 60,
    };

    const token = this.loginUserService.genereteJwtToken(payload, secretKeyJwt);

    return {
      statusCode: 200,
      body: { user, token },
    };
  }
}
