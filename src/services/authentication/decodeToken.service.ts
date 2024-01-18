import jwt, { JwtPayload } from "jsonwebtoken";
import { IDecodeTokenService } from "../../interfaces/authentication/decodeToken.interface";

export class DecodeTokenService implements IDecodeTokenService {
  public decodeToken(token: string): JwtPayload | null {
    try {
      const secretyKey = process.env.JWT_SECRETY_KEY;

      if (!secretyKey) {
        throw new Error("Chave secreta não definida");
      }

      const decoded = jwt.verify(token, secretyKey);

      if (decoded && typeof decoded === "object" && "exp" in decoded) {
        return decoded;
      }

      throw new Error("Token decodificado não possui o formato esperado");
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }
}
