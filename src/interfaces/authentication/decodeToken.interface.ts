import { JwtPayload } from "jsonwebtoken";

export interface IDecodeToken {
  decodeToken(token: string): JwtPayload | null;
}
