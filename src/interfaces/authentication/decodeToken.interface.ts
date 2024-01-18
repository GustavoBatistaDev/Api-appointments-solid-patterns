import { JwtPayload } from "jsonwebtoken";

export interface IDecodeTokenService {
  decodeToken(token: string): JwtPayload | null;
}
