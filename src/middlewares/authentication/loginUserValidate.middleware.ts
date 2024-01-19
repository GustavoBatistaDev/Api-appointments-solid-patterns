import { Response, NextFunction } from "express";
import { ValidationResult } from "types/authentication/authentication.types";
import { ValidationError } from "joi";

import { User } from "../../models/authentication/user";
import { Schema } from "joi";
import { Request } from "../../interfaces/http/httpRequest.interface";
import { ILoginUserService } from "../../interfaces/authentication/loginUser.interface";

export class LoginUserValidatorMiddleware {
  constructor(
    private readonly loginUserService: ILoginUserService,
    private readonly loginSchema: Schema,
  ) {}

  public validateDataLoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationResult> => {
    try {
      await this.loginSchema.validateAsync(req.body);
      const { email, password } = req.body;
      const user: User | null =
        await this.loginUserService.getUserByEmail(email);

      if (user) {
        if (!user?.active) {
          return res.status(400).json({
            message: "Você precisa verificar seu email antes de fazer login.",
          });
        }
        const userAuthenticated: null | User =
          await this.loginUserService.authenticate(
            email,
            password,
            user.password,
          );

        if (userAuthenticated) {
          req.user = userAuthenticated;

          next();
          return;
        }
      }

      return res.status(400).json({
        message: "Email ou senha inválidos.",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
    }
  };
}
