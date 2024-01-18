import { payLoadJwt } from "types/authentication/payloadJwt.types";

export interface ICreateTokenJwtService {
  createToken(payload: payLoadJwt, secretKeyJwt: string): string;
}
