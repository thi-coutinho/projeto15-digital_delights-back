import { Router } from "express";
import { signUp } from "../controllers/AuthController.js";
import { ValidateSchema } from "../middlewares/ValidateSchema.js";
import { signUpSchema } from "../schemas/AuthSchema.js";


const AuthRouter = Router();

AuthRouter.post('/sign-up', ValidateSchema(signUpSchema), signUp);

export default AuthRouter;