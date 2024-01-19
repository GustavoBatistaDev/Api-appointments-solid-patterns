import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O campo email deve ser um endereço de e-mail válido.",
    "any.required": "O campo email é obrigatório.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "O campo password deve ter pelo menos 6 caracteres.",
    "any.required": "O campo password é obrigatório.",
  }),
});
