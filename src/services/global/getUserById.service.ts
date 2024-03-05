import { IGetUserById } from "../../interfaces/global/users/getUserById.interface";
import { User } from "../../models/authentication/user";

import { IGetUserByIdRepository } from "../../interfaces/repositories/users/getUserById.interface";

export class GetUserByIdService implements IGetUserById {
  constructor(private readonly GetUserByIdRepository: IGetUserByIdRepository) {}

  async getUser(ìd: number): Promise<User> {
    const user = await this.GetUserByIdRepository.getUserByid(ìd);
    return user;
  }
}
