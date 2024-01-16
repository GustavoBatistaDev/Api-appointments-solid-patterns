import { User } from "models/user";
import { IUserDTO } from "./userDTO.interface";

export interface ICreateUserRepository {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
