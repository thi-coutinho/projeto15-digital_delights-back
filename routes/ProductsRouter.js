import { Router } from "express";
import getAllProducts from "../controllers/ProductController";


const ProductsRouter = Router()


ProductsRouter.get("/home",getAllProducts)

export default ProductsRouter