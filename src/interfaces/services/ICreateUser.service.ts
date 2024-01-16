import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/user";

export interface ICreateUserService {
    createUser(IUserDTO: IUserDTO): Promise<User>
}
