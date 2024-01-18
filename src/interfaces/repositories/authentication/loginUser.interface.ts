export interface ILoginUser {
  authenticate(email: string, password: string): Promise<boolean>;
}
