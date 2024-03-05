import { User } from "../../../models/authentication/user";

export interface IGetUserById {
  getUser(ìd: number): Promise<User>;
}
