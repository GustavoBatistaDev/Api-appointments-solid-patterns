import { NextFunction, Request, Response } from "express";
import { IDecodeTokenService } from "interfaces/authentication/decodeToken.interface";
import { IGetUserByIdService } from "interfaces/global/users/getUserById.interface";

export class ValidateAlterPasswordMiddleware {
  constructor(
    private readonly GetUserByIdService: IGetUserByIdService,
    private readonly DecodeTokenService: IDecodeTokenService,
  ) {}
  public validateEmailRecoverPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.params.token as string;

    try {
      const tokenDecoded = this.DecodeTokenService.decodeToken(token);

      if (!tokenDecoded) {
        return res.status(400).json({
          message: "Forneça um token válido.",
        });
      }

      const user = await this.GetUserByIdService.getUser(tokenDecoded.userId);
      if (!user) {
        return res.status(400).json({
          message: "Usuário não encontrado.",
        });
      }

      res.locals.userId = tokenDecoded.userId;

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Forneça um email válido.",
      });
    }
  };

  public validatePasswords = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { password, passwordConfirm } = req.body;

    if (password && passwordConfirm) {
      if (password.length < 6 || passwordConfirm.length < 6) {
        return res.status(400).json({
          message: "Forneça passwords com no mínimo 6 caracteres.",
        });
      }
      if (password === passwordConfirm) {
        next();
      } else {
        return res.status(400).json({
          message: "Forneça passwords iguais.",
        });
      }
    } else {
      return res.status(400).json({
        message: "Forneça passwords válidos.",
      });
    }
  };
}
