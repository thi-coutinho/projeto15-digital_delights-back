import {Router} from 'express';
import { addPaymentMethod } from '../controllers/SalesController.js';
import { authValidation } from '../middlewares/AuthMiddleware.js';
import { ValidateSchema } from '../middlewares/ValidateSchema.js';
import { PaymentSchema } from '../schemas/PaymentSchema.js';

const PaymentRouter = Router();

PaymentRouter.use(authValidation)
PaymentRouter.post('/payment-method', ValidateSchema(PaymentSchema), addPaymentMethod);

export default PaymentRouter;