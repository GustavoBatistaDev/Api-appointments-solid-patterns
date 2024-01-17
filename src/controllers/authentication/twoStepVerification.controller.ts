import { Request } from "express";
import { IController } from "interfaces/global/controllers/controllerProtocol.interface";
import { ObjectResponse } from "../../types/authentication/authentication.types";

export class TwoStepVerificationController implements IController {
  public async handle(httpRequest: Request): Promise<ObjectResponse> {
    if (!httpRequest.query) {
      return {
        statusCode: 400,
        body: "Query is required.",
      };
    }

    console.log(httpRequest.query);

    return {
      statusCode: 200,
      body: "",
    };
  }
}
