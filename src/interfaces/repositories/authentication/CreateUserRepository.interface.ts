import { User } from "models/authentication/user";
import { IUserDTO } from "interfaces/users/userDTO.interface";

export interface ICreateUserRepository {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
