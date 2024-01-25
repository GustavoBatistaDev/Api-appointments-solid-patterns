import { Response } from "express";
import { Request } from "../../interfaces/http/httpRequest.interface";
import { IController } from "../../interfaces/global/controllers/controllerProtocol.interface";
import { IUpdateUserService } from "../../interfaces/users/updateUser.service";
import { ObjectResponse } from "../../types/authentication/authentication.types";
import { User } from "../../models/authentication/user";

export class UpdateProfileController implements IController {
  constructor(private readonly updateUserService: IUpdateUserService) {}
  public async handle(
    httpRequest: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    httpResponse: Response,
  ): Promise<ObjectResponse<unknown>> {
    try {
      const body = httpRequest.body;

      const user = httpRequest.user as User;
      await this.updateUserService.updateUser(user.id, body);

      return {
        statusCode: 200,
        body: "Perfil atualizado com sucesso.",
      };
    } catch (error) {
      console.log(error);
      console.error("Erro na validação ou na lógica de atualização do perfil:");
      return {
        statusCode: 400,
        body: "Erro na atualização do perfil. Tente novamente",
      };
    }
  }
}
