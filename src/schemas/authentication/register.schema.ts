import Joi from "joi";

export const registerSchema = Joi.object({
  nome: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ]+$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "O campo nome deve conter apenas caracteres alfabéticos.",
      "any.required": "O campo firstName é obrigatório.",
    }),
  ultimo_nome: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ]+$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "O campo último nome deve conter apenas caracteres alfabéticos.",
      "any.required": "O campo lastName é obrigatório.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "O campo email deve ser um endereço de e-mail válido.",
    "any.required": "O campo email é obrigatório.",
  }),
  senha: Joi.string().min(6).required().messages({
    "string.min": "O campo senha deve ter pelo menos {#limit} caracteres.",
    "any.required": "O campo senha é obrigatório.",
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
