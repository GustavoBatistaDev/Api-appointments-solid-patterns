import { User } from "../../models/authentication/user";
import { payLoadJwt } from "../../types/authentication/payloadJwt.types";

export interface ILoginUserService {
  authenticate(
    email: string,
    password: string,
    hashPassword: string,
  ): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  genereteJwtToken(payload: payLoadJwt, secretKeyJwt: string): string;
}
