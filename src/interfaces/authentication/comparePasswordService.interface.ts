export interface IComparePasswordService {
  comparePassword(password: string, hashPassword: string): Promise<boolean>;
}
