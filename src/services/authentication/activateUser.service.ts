import { IActivateUserRepository, IActivateUserService } from "../../interfaces/authentication/activateUser.interface";

export class ActivateUserService implements IActivateUserService{
  constructor(
    private readonly activateUserRepository: IActivateUserRepository,
  ) {}
  public async activateUser(id: number): Promise<void> {
    await this.activateUserRepository.activateUser(id);
  }
}
