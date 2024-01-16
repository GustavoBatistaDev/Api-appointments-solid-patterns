import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ValidationResult } from "types/authentication.types";
import { ValidationError } from "joi";

export class CreateUserValidatorMiddleware {
  constructor(private readonly joiSchema: Schema) {}

  // Usando uma arrow function para o método validate
  public validate = async (
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
}
