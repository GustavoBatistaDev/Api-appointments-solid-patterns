import { User } from "../../../models/authentication/user";

export interface ILoginUserRepository {
  authenticate(
    email: string,
    password: string,
    hashPassword: string,
  ): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;
}
