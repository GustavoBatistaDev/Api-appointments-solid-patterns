import { HttpResponse } from "controllers/protocols";
import { IGetUsersController, IGetUsersRepository } from "./protocols";
import { User } from "models/user";

export class GetUsersController implements IGetUsersController {
  constructor(getUsersRepository: IGetUsersRepository) {}

  handle() {}
}
