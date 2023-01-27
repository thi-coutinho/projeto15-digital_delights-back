import { Router } from "express";
import {addProductToCart, delProductCart, getCartProducts} from "../controllers/CartController.js";


const CartRouter = Router()


CartRouter.get("/cart",getCartProducts)
CartRouter.post("/cart",addProductToCart)
CartRouter.delete("/cart",delProductCart)

export default CartRouter