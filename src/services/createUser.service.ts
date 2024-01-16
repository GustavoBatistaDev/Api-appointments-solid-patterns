import { ICreateUserService } from "interfaces/services/ICreateUser.service";
import { ICreateUserRepository } from "interfaces/user/createUser.interface";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/user";

export class CreateUserService implements ICreateUserService {
  constructor(private readonly CreateUserRepository: ICreateUserRepository) {}
  public async createUser(UserDTO: IUserDTO): Promise<User> {
    const user = await this.CreateUserRepository.createUser(UserDTO);

    return user;
  }
}
