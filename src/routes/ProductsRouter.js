import { Router } from "express";
import getAllProducts from "../controllers/ProductController.js";


const ProductsRouter = Router()


ProductsRouter.get("/home",getAllProducts)

export default ProductsRouter