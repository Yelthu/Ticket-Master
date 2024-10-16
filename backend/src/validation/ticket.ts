import Joi from "joi";

export const ticketSchema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(5).required()
})