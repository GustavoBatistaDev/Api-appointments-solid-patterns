import { HttpResponse } from "controllers/protocols";
import { IGetUsersController} from "./protocols";
import { User } from "models/user";
import { IGetUsersRepository } from "../../repositories/get-users/protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 200,
        body: "Erro interno do servidor.",
      };
    }
  }
}
