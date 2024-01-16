import { User } from "aws-sdk/clients/budgets";
import { IUserDTO } from "interfaces/user/userDTO.interface";

export interface ICreateUserRepository {
  createUser(IUserDTO: IUserDTO): Promise<User>;
}
