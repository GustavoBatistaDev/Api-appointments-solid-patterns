import bcrypt from "bcrypt";
import { IEncryptorPasswordService } from "../../interfaces/authentication/encryptorPassword.interface";

export class EncryptorPasswordService implements IEncryptorPasswordService{
  public async encryptorPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
