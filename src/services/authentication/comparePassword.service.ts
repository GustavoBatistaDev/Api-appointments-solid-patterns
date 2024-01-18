import bcrypt from "bcrypt";
import { IComparePasswordService } from "../../interfaces/authentication/comparePasswordService.interface";

export class ComparePasswordService implements IComparePasswordService {
  public async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hashPassword);
  }
}
