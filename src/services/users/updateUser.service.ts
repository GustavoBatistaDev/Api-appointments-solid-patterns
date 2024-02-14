import { User } from "models/authentication/user";

import { IUpdateUserService } from "../../interfaces/users/updateUser.service";
import { IUpdateUserRepository } from "../../interfaces/repositories/users/updateUserRepository.interface";
import { IEncryptorPasswordService } from "../../interfaces/authentication/encryptorPassword.interface";

export class UpdateUserService implements IUpdateUserService {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository,
    private readonly EncryptorPasswordService: IEncryptorPasswordService,
  ) {}

  public async updateUser(id: number, dataUser: User): Promise<void> {
    try {
      const passwordEncrypted =
        await this.EncryptorPasswordService.encryptorPassword(dataUser.senha);

      dataUser.senha = passwordEncrypted;
      await this.updateUserRepository.updateUser(id, dataUser);
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao atualizar o perfil do usuário.");
    }
  }
}
