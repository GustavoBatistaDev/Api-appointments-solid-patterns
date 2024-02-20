import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ValidationResult } from "types/authentication/authentication.types";
import { ValidationError } from "joi";
import { IGetUserService } from "interfaces/services/authentication/getUsers.interface";

export class CreateUserValidatorMiddleware {
  constructor(
    private readonly joiSchema: Schema,
    private readonly getUserService: IGetUserService,
  ) {}

  public validateDataCreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationResult> => {
    try {
      await this.joiSchema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
    }
  };

  public validateEmailAndCpfExistsInDB = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationResult> => {
    try {
      const emailOrCpfExists: boolean =
        await this.getUserService.getUserByCpfOrEmail("", req.body.email);

      if (emailOrCpfExists) {
        return res
          .status(400)
          .json({ message: "Se você já possui conta, faça login." });
      }

      next();
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro interno do servidor. Tente novamente." });
    }
  };
}
