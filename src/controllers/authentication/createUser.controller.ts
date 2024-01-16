import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { HttpRequest } from "interfaces/global/http/httpRequest.interface";
import { HttpResponse } from "interfaces/global/http/httpResponse.interface";
import { ICreateUserService } from "interfaces/services/authentication/ICreateUser.service";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/authentication/user";

export class CreateUserController implements IController {
  constructor(private readonly createUserService: ICreateUserService) {}

  public async handle(
    httpRequest: HttpRequest<IUserDTO>,
  ): Promise<HttpResponse<User | string>> {
    if (!httpRequest.body) {
      return {
        statusCode: 400,
        body: "Body is required.",
      };
    }

    const body = await this.createUserService.createUser(httpRequest.body);
    return {
      statusCode: 200,
      body,
    };
  }
}
