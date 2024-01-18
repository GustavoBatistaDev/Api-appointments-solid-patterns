import { User } from "../../models/authentication/user";

export interface ILoginUserService {
  authenticate(
    email: string,
    password: string,
    hashPassword: string,
  ): Promise<User | null>;
}
