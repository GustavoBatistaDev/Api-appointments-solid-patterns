import { IGetUserRepository } from "interfaces/repositories/authentication/getUsersRepository.interface";
import { IGetUserService } from "interfaces/services/authentication/getUsers.interface";
import { User } from "models/authentication/user";

export class GetUserService implements IGetUserService {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  public async getUserByEmail(email: string): Promise<User | null> {
    const user: User | null =
      await this.getUserRepository.getUserByEmail(email);
    return user ? user : null;
  }

  public async getUserByCpfOrEmail(
    cpf: string,
    email: string,
  ): Promise<boolean> {
    const userExists: boolean =
      await this.getUserRepository.getUserByCpfOrEmail(cpf, email);

    return userExists;
  }
}
