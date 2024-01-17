import { Request } from "express";
import { ObjectResponse } from "../../../types/authentication/authentication.types";

export interface IController {
  handle(httpRequest: Request): Promise<ObjectResponse<unknown>>;
}
