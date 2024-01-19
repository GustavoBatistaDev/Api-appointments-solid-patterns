import { Request as ExpressRequest } from "express";
import { User } from "../../models/authentication/user";

export interface Request extends ExpressRequest {
  authenticated?: boolean;
  user?: User;
}
