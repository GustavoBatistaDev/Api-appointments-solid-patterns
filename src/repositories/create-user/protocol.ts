import { IUserDTO } from "controllers/create-user/protocols";
import { User } from "models/user";

export interface ICreateUserRepository{
    createUser(createUserParams: IUserDTO): Promise<User>
}

