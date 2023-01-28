import joi from "joi";

//Payment schema
export const PaymentSchema = joi.object({
    name: joi.string().required(),
    cardNumber: joi.number().required(),
    cvv: joi.number().required(),
    expDate: joi.number().required(),
});