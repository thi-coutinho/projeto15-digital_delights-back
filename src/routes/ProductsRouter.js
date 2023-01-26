import { Router } from "express";
import getAllProducts from "../controllers/ProductController.js";


const ProductsRouter = Router()


ProductsRouter.get("/",getAllProducts)

export default ProductsRouter