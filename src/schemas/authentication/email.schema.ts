import Joi from "joi";

export const recoverPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O campo email deve ser um endereço de e-mail válido.",
    "any.required": "O campo email é obrigatório.",
  })
});
