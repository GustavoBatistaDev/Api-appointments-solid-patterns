import { User } from "models/user";

export interface ICreateUserRepository{
    createUser(): Promise<User>
}

