import { HttpRequest, HttpResponse } from "controllers/protocols";
import { User } from "models/user";

export interface ICreateUserController {
  handle(HttpRequest: HttpRequest<IUserDTO>): Promise<HttpResponse<User>>;
}

export interface IUserDTO {
  username: string;
  name: string;
  email: string;
  password: string;
}
