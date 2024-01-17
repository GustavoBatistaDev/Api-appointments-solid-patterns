import jwt from "jsonwebtoken";

import { ICreateTokenJwt } from "interfaces/authentication/createToken.interface";
import { payLoadJwt } from "types/authentication/payloadJwt.types";

export class CreateTokenJwt implements ICreateTokenJwt {
  public createToken(
    userId: payLoadJwt,
    secretyKey: string,
    expires: string,
  ): string {
    const token = jwt.sign({ userId }, secretyKey, { expiresIn: expires });
    return token;
  }
}
