import { User } from "../../../models/authentication/user";
import { IUserDTO } from "../../../types/users/userDTO.types";

export interface ICreateUserRepository {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
