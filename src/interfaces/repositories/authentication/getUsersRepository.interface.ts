export interface IGetUserRepository {
  getUserByCpfOrEmail(cpf: string, email: string): Promise<boolean>;
}
