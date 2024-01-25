import { NextFunction, Request, Response } from "express";

import { Schema, ValidationError } from "joi";

export class ValidateUpdateProfileMiddleware {
  constructor(private readonly joiSchema: Schema) {}
  public validateUpdateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
