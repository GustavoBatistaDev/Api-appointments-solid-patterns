import { User } from "models/authentication/user";

import { IUpdateUserService } from "../../interfaces/users/updateUser.service";
import { IUpdateUserRepository } from "../../interfaces/repositories/users/updateUserRepository.interface";

export class UpdateUserService implements IUpdateUserService {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  public async updateUser(id: number, dataUser: User): Promise<void> {
    try {
      await this.updateUserRepository.updateUser(id, dataUser);
    } catch (error) {
      throw new Error("Falha ao atualizar o perfil do usuário.");
    }
  }
}
