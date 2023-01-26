import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthController.js";
import { ValidateSchema } from "../middlewares/ValidateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/AuthSchema.js";


const AuthRouter = Router();

AuthRouter.post('/sign-up', ValidateSchema(signUpSchema), signUp);
AuthRouter.post('/sign-in', ValidateSchema(signInSchema), signIn)

export default AuthRouter;