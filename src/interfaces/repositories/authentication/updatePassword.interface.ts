export interface IUpdatePasswordRepository {
  updatePassword(id: number, password: string): Promise<void>;
}
