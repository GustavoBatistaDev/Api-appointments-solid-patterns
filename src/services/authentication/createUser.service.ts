import { ICreateUserRepository } from "../../interfaces/repositories/authentication/createUserRepository.interface";
import { IUserDTO } from "interfaces/user/userDTO.interface";
import { User } from "models/authentication/user";
import { IEncryptorPasswordService } from "../../interfaces/authentication/encryptorPassword.interface";

export class CreateUserService {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly EncryptorPasswordService: IEncryptorPasswordService,
  ) {}
  public async createUser(UserDTO: IUserDTO): Promise<User> {
    UserDTO.password = await this.EncryptorPasswordService.encryptorPassword(
      UserDTO.password,
    );

    const user = await this.createUserRepository.createUser(UserDTO);

    return user;
  }
}
