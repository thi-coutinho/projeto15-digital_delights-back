import joi from 'joi';

export const productIdSchema = joi.object({
    productId: joi.string().alphanum().length(24).required(),
  });