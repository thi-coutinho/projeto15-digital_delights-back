import { Router } from "express";
import {addProductToCart, delProductCart, getCartProducts} from "../controllers/CartController.js";
import { authValidation } from "../middlewares/AuthMiddleware.js";


const CartRouter = Router()

CartRouter.use(authValidation)
CartRouter.get("/cart",getCartProducts)
CartRouter.post("/cart",addProductToCart)
CartRouter.delete("/cart",delProductCart)

export default CartRouter