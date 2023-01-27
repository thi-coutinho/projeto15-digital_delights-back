import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import ProductsRouter from './routes/ProductsRouter.js'
import AuthRoutes from './routes/AuthRoutes.js';
import CartRouter from './routes/CartRouter.js';

dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

app.use([AuthRoutes,ProductsRouter,CartRouter])


const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))