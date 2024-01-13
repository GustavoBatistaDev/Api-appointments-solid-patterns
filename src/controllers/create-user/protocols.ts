import { HttpResponse } from "controllers/protocols";
import { User } from "models/user";

export interface ICreateUserController {
  insert(): Promise<HttpResponse<User>>;
}
