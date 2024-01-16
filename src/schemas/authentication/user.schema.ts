import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ]+$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "O campo firstName deve conter apenas caracteres alfabéticos.",
      "any.required": "O campo firstName é obrigatório.",
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ]+$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "O campo lastName deve conter apenas caracteres alfabéticos.",
      "any.required": "O campo lastName é obrigatório.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "O campo email deve ser um endereço de e-mail válido.",
    "any.required": "O campo email é obrigatório.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "O campo password deve ter pelo menos {#limit} caracteres.",
    "any.required": "O campo password é obrigatório.",
  }),
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base":
        "O campo cpf deve seguir o formato xxx.xxx.xxx-xx.",
      "any.required": "O campo cpf é obrigatório.",
    }),
});
