import { Response } from "express";
import { Request } from "../../interfaces/http/httpRequest.interface";
import { IController } from "../../interfaces/global/controllers/controllerProtocol.interface";
import { IUpdateUserService } from "../../interfaces/users/updateUser.service";
import { ObjectResponse } from "../../types/authentication/authentication.types";
import { User } from "../../models/authentication/user";
import { UploadUserPhotoService } from "../../services/upload/upload.services";

export class UpdateProfileController implements IController {
  constructor(
    private readonly updateUserService: IUpdateUserService,
    private readonly uploadUserPhotoService: UploadUserPhotoService,
    
  ) {}
  public async handle(
    httpRequest: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    httpResponse: Response,
  ): Promise<ObjectResponse<unknown>> {
    try {
      const body = httpRequest.body;
      const { file } = httpRequest;
      const user = httpResponse.locals.user as User;

      if (!file) {
        return {
          statusCode: 400,
          body: "Erro na atualização do perfil. Tente novamente",
        };
      }

      const pathPhoto = await this.uploadUserPhotoService.handleUpload(
        process.env.BACKBLAZE_BUCKET as string,
        `pacientes/${file.originalname}`,
        file.buffer,
        file.mimetype,
      );

      body.foto = pathPhoto;

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
