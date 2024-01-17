import { User } from "models/authentication/user";

export interface IGetUserByIdService {
  getUser(ìd: number): Promise<User>;
}
