import { IController } from "interfaces/global/controllerProtocol.interface";
import { HttpRequest } from "interfaces/global/httpRequest.interface";
import { HttpResponse } from "interfaces/global/httpResponse.interface";
import { ICreateUserService } from "interfaces/services/ICreateUser.service";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/user";

export class CreateUserController implements IController {
  constructor(private readonly CreateUserService: ICreateUserService) {}

  public async handle(
    httpRequest: HttpRequest<IUserDTO>,
  ): Promise<HttpResponse<User>> {
    if (!httpRequest.body) {
      return {
        statusCode: 400,
        body: "Body is required.",
      };
    }

    const body = await this.CreateUserService.createUser(httpRequest.body);
    return {
      statusCode: 200,
      body,
    };
  }
}
