export interface IEncryptorPasswordService {
  encryptorPassword(password: string): Promise<string>;
}
