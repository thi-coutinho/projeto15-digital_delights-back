import joi from 'joi';

//SignUp section
export const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});

// SignIn 
export const signInSchema =  joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})