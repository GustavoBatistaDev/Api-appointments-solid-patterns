export interface IActivateUserRepository {
  activateUser(id: number): Promise<void>;
}

export interface IActivateUserService {
  activateUser(id: number): Promise<void>;
}
