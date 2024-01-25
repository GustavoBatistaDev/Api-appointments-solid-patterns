import { Request, Response } from "express";
import { ObjectResponse } from "../../../types/authentication/authentication.types";

export interface IController {
  handle(
    httpRequest: Request,
    httpResponse: Response,
  ): Promise<ObjectResponse<unknown>>;
}
