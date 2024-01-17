import { Response } from "express";

export type ValidationResult = void | Response;

export type ObjectResponse<T = string> = {
  statusCode: number;
  body?: T | string;
};
