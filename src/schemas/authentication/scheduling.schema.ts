import Joi from "joi";

export const appointmentSchema = Joi.object({
  dia: Joi.date().iso().required(),
  razao_consulta: Joi.string().required(),
  necessidade_especial: Joi.string().required(),
  pcd: Joi.boolean().required(),
  doenca_cronica: Joi.boolean().required(),
  especialidades_id: Joi.number().required(),
  horas: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/)
    .required()
    .messages({
      "string.pattern.base":
        'Formato inválido. Utilize o formato "HH:mm:ss". Exemplo: "08:00:00"',
      "any.required": "O campo horas é obrigatório.",
    }),
});
