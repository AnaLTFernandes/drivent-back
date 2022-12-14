import Joi from "joi";
import { CreatePaymentParams } from "@/services";

export const createPaymentSchema = Joi.object<CreatePaymentParams>({
  ticketId: Joi.number().min(1).required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }).required(),
});
