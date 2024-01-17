import { payLoadJwt } from "types/authentication/payloadJwt.types";

export interface ICreateTokenJwt {
  createToken(userId: payLoadJwt, secretyKey: string, expires: string): string;
}
