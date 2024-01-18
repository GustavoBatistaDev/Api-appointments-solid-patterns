import { ILoginUserRepository } from "../../interfaces/repositories/authentication/loginUser.interface";
import { ILoginUserService } from "../../interfaces/authentication/loginUser.interface";
import { ICreateTokenJwtService } from "../../interfaces/authentication/createToken.interface";

import { User } from "models/authentication/user";

import { payLoadJwt } from "../../types/authentication/payloadJwt.types";

export class LoginUserService implements ILoginUserService {
  constructor(
    private readonly loginUserRepository: ILoginUserRepository,
    private readonly createTokenJwtService: ICreateTokenJwtService,
  ) {}

  public async authenticate(
    email: string,
    password: string,
    hashPassword: string,
  ): Promise<null | User> {
    const userAuthenticated: User | null =
      await this.loginUserRepository.authenticate(
        email,
        password,
        hashPassword,
      );

    if (!userAuthenticated) {
      return null;
    }

    return userAuthenticated;
  }

  public genereteJwtToken(payload: payLoadJwt, secretKeyJwt: string): string {
    return this.createTokenJwtService.createToken(payload, secretKeyJwt);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user: User | null =
      await this.loginUserRepository.getUserByEmail(email);
    return user ? user : null;
  }
}
