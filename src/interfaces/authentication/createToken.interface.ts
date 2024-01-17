import { payLoadJwt } from "types/authentication/payloadJwt.types";

export interface ICreateTokenJwt {
  createToken(payload: payLoadJwt, secretKeyJwt: string): string;
}
