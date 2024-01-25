import { NextFunction, Request, Response } from "express";
import { IGetUserService } from "interfaces/services/authentication/getUsers.interface";
import { Schema } from "joi";

export class ValidateEmailChangePasswordMiddleware {
  constructor(
    private readonly recoverPasswordSchema: Schema,
    private readonly getUserService: IGetUserService,
  ) {}
  public validateEmailRecoverPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.recoverPasswordSchema.validateAsync(req.body);
      const userExists: boolean = await this.getUserService.getUserByCpfOrEmail(
        "",
        req.body.email,
      );

      console.log(userExists);

      if (!userExists) {
        return res.status(400).json({
          message: "Usuário não encontrado.",
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Forneça um email válido.",
      });
    }
  };
}
