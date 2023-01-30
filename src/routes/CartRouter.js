import { Router } from "express";
import {addProductToCart, delProductCart, emptyCart, getCartProducts} from "../controllers/CartController.js";
import { authValidation } from "../middlewares/AuthMiddleware.js";


const CartRouter = Router()

CartRouter.use(authValidation)
CartRouter.get("/cart",getCartProducts)
CartRouter.post("/cart",addProductToCart)
CartRouter.put("/cart",delProductCart)
CartRouter.delete("/cart",emptyCart)

export default CartRouter