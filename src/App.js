import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ProductsRouter from '../routes/ProductsRouter'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use([ProductsRouter])


const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))