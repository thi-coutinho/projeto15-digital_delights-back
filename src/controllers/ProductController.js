import { ObjectId } from "mongodb";
import { productsCollection } from "../config/database.js";

export async function getAllProducts(req,res){
    const limit = req.query?.limit || 20
    // const {page} = req.query
    // const {userId} = res.locals.session
    try {
        const productsArray = await productsCollection.find().toArray()
        res.send(productsArray.slice(0,limit))
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }

}

export async function getProductById(req,res) {
    const {productId} = req.params
    console.log(req.params)
    try {
        const product = await productsCollection.findOne({_id: ObjectId(productId)})
        console.log(product)
        if (!product) return res.status(404).send("Can't find product by Id.")
        res.send(product)
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }
}