import Joi from "joi";

export const profileSchema = Joi.object({
  nome: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ]+$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "O campo nome deve conter apenas caracteres alfabéticos.",
      "any.required": "O campo nome é obrigatório.",
    }),
  ultimo_nome: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ]+$/)
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "O campo último nome deve conter apenas caracteres alfabéticos.",
      "any.required": "O campo último nome é obrigatório.",
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
  foto: Joi.string().required().messages({
    "any.required": "O campo foto é obrigatório.",
  }),
  rg: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "O RG deve ser uma string.",
      "string.length": "O RG deve ter exatamente 10 dígitos.",
      "string.pattern.base": "O RG deve conter apenas números.",
      "any.required": "O campo RG é obrigatório.",
    }),
  data_nascimento: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "O formato da data de nascimento deve ser DD/MM/AAAA",
    }),
  numero_celular: Joi.string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "O formato do número de celular deve ser (DD) 12345-6789",
    }),
});
