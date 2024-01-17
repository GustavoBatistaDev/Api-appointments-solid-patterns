import { User } from "models/authentication/user";

export interface IGetUserByIdRepository {
  getUserByid(id: number): Promise<User>;
}
