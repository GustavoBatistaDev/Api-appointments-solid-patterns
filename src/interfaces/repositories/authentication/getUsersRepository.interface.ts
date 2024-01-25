import { User } from "../../../models/authentication/user";

export interface IGetUserRepository {
  getUserByCpfOrEmail(cpf: string, email: string): Promise<boolean>;

  getUserByEmail(email: string): Promise<User | null>;
}
