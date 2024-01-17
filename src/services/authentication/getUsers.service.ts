import { IGetUserRepository } from "interfaces/repositories/authentication/getUsersRepository.interface";

export class GetUserService {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  public async getUserByCpfOrEmail(
    cpf: string,
    email: string,
  ): Promise<boolean> {
    const userExists: boolean =
      await this.getUserRepository.getUserByCpfOrEmail(cpf, email);

    return userExists;
  }
}
