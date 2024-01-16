import { ICreateUserService } from "interfaces/services/authentication/ICreateUser.service";
import { ICreateUserRepository } from "../../interfaces/repositories/authentication/CreateUserRepository.interface";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/authentication/user";

export class CreateUserService implements ICreateUserService {
  constructor(private readonly CreateUserRepository: ICreateUserRepository) {}
  public async createUser(UserDTO: IUserDTO): Promise<User> {
    const user = await this.CreateUserRepository.createUser(UserDTO);

    return user;
  }
}
