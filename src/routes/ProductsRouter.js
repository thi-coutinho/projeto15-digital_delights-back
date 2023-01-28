import { Router } from "express";
import {getAllProducts, getProductById} from "../controllers/ProductController.js";
import { ValidateSchemaParams } from "../middlewares/ValidateSchema.js";
import { productIdSchema } from "../schemas/ProductIdSchema.js";


const ProductsRouter = Router()


ProductsRouter.get("/",getAllProducts)
ProductsRouter.get("/product/:productId",ValidateSchemaParams(productIdSchema),getProductById)

export default ProductsRouter