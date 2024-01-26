import { NextFunction, Request, Response } from "express";
import { IDecodeTokenService } from "../../interfaces/authentication/decodeToken.interface";

import { IGetUserByIdService } from "interfaces/global/users/getUserById.interface";

export class ValidateProfileCompletedMiddleware {
  constructor(
    private readonly decodeTokenService: IDecodeTokenService,
    private readonly getUserById: IGetUserByIdService,
  ) {}
  public validateUpdateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { authorization } = req.headers;

      if (authorization) {
        const [, token] = authorization.split(" ");
        const payloadDecoded = this.decodeTokenService.decodeToken(token);
        if (payloadDecoded) {
          const user = await this.getUserById.getUser(payloadDecoded.userId);
          if (!user.numero_celular || !user.rg || !user.data_nascimento) {
            return res.status(400).json({
              message:
                "Por favor, complete seu perfil antes solicitar um agendamento.",
            });
          } else {
            res.locals.user = user;
            next();
          }
        } else {
          return res.status(400).json({
            message: "Algo deu errado. Tente novamente mais tarde.",
          });
        }
      } else {
        return res.status(401).json();
      }
    } catch (error) {
      console.log(error);
    }
  };
}
