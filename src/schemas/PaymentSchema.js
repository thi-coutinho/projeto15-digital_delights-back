import joi from "joi";

//Payment schema
export const PaymentSchema = joi.object({
    name: joi.string().required(),
    cardNumber: joi.string().creditCard().required(),
    cvv: joi.number().required(),
    expDate: joi.date().required(),
});
//joi.string().length(16).pattern(/^[0-9]+$/).required(),