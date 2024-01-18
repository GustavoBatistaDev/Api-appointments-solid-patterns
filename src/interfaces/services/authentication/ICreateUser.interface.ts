import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/authentication/user";

export interface ICreateUserService {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
