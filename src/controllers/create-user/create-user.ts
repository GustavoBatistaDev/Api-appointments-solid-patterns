import { HttpRequest, HttpResponse } from "controllers/protocols";
import { User } from "models/user";
import { ICreateUserController, IUserDTO } from "./protocols";
import { ICreateUserRepository } from "repositories/create-user/protocol";

export class CreateUserController implements ICreateUserController {
  constructor(private CreateUserRepository: ICreateUserRepository) {}

  async handle(HttpRequest: HttpRequest<IUserDTO>): Promise<HttpResponse<User>> {
    try {
      const result: User = await this.CreateUserRepository.createUser(
        HttpRequest.body,
      );
      return {
        statusCode: 201,
        body: result,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro interno do servidor",
      };
    }
  }
}
