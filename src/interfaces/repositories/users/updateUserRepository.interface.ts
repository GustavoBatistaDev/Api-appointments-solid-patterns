import { User } from "../../../models/authentication/user";

export interface IUpdateUserRepository {
  updateUser(id: number, dataUser: User): Promise<void>;
}
