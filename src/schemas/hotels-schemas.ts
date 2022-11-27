import Joi from "joi";

export const Gethotels = Joi.object({
  idTicket: Joi.number().required(),
});
