import { NextFunction, Request, Response } from "express";
import { IGetUserService } from "../../interfaces/services/authentication/getUsers.interface";

import { Schema, ValidationError } from "joi";

export class ValidateUpdateProfileMiddleware {
  constructor(
    private readonly joiSchema: Schema,
    private readonly getUserService: IGetUserService,
  ) {}
  public validateUpdateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { file } = req;
    console.log(file);
    if (!file) {
      return res.status(400).json({
        message: "Foto é obrigatória.",
      });
    }

    try {
      await this.joiSchema.validateAsync(req.body);
      if (await this.validateCpfAlreadyExists(req.body.cpf)) {
        return res.status(400).json({
          message: "Tente outro cpf.",
        });
      }
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

  public validateCpfAlreadyExists = async (cpf: string): Promise<boolean> => {
    return await this.getUserService.getUserByCpfOrEmail(cpf, "");
  };
}
