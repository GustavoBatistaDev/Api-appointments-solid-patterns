import { HttpResponse } from "controllers/protocols";
import { User } from "models/user";
import { ICreateUserController } from "./protocols";
import { ICreateUserRepository } from "repositories/create-user/protocol";

export class CreateUsersController implements ICreateUserController {
  constructor(private ICreateUserRepository: ICreateUserRepository) {}

  async insert(): Promise<HttpResponse<User>> {
    try {
      const result: User = await this.ICreateUserRepository.createUser();
      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      return {
        statusCode: 200,
        body: "Erro interno do servidor",
      };
    }
  }
}
