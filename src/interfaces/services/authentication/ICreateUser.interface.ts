import { IUserDTO } from "../../../types/users/userDTO.types";
import { User } from "../../../models/authentication/user";

export interface ICreateUserService {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
