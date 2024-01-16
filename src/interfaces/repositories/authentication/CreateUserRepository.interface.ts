import { User } from "models/authentication/user";
import { IUserDTO } from "interfaces/user/userDTO.interface";

export interface ICreateUserRepository {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
