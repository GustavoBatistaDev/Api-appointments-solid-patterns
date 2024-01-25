import { UpdatePasswordRepository } from "../../repositories/authentication/updatePassword.repository";

export class UpdatePasswordService {
  constructor(
    private readonly updatePasswordRepository: UpdatePasswordRepository,
  ) {}
  public async updatePassword(id: number, password: string): Promise<void> {
    this.updatePasswordRepository.updatePassword(id, password);
  }
}
