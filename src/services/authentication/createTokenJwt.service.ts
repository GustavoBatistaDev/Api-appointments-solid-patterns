import jwt from "jsonwebtoken";

import { ICreateTokenJwtService } from "interfaces/authentication/createToken.interface";
import { payLoadJwt } from "types/authentication/payloadJwt.types";

export class CreateTokenJwtService implements ICreateTokenJwtService {
  public createToken(payload: payLoadJwt, secretKeyJwt: string): string {
    const token = jwt.sign(payload, secretKeyJwt);
    return token;
  }
}
