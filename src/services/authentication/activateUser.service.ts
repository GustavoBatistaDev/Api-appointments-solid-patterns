import { IActivateUser } from "../../interfaces/authentication/activateUser.interface";

export class ActivateUserService {
  constructor(private readonly activateUserRepository: IActivateUser) {}
  public async activateUser(id: number): Promise<void> {
    await this.activateUserRepository.activateUser(id);
  }
}
