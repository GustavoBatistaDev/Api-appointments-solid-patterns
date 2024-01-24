import { NextFunction, Response } from "express";
import { Request } from "interfaces/http/httpRequest.interface";
import { ValidationResult } from "../../types/authentication/authentication.types";
import { IDecodeTokenService } from "../../interfaces/authentication/decodeToken.interface";
import { IGetUserByIdService } from "../../interfaces/global/users/getUserById.interface";
import { User } from "../../models/authentication/user";

export class VerifyLoggedUserMiddleware {
  constructor(
    private readonly DecodeTokenService: IDecodeTokenService,
    private readonly getUserByIdService: IGetUserByIdService,
  ) {}
  public verifyLoggedUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationResult> => {
    const { authorization } = req.headers;

    if (authorization) {
      const [, token] = authorization.split(" ");
      if (token) {
        const tokenDecoded = await this.DecodeTokenService.decodeToken(token);
        if (tokenDecoded) {
          const user: User = await this.getUserByIdService.getUser(
            tokenDecoded.userId,
          );
          console.log(tokenDecoded.userId);

          if (user) {
            next();
            return;
          }
        }
      }
    }

    return res.status(401).json();
  };
}
