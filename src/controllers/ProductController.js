import { productCollection } from "../config/database.js";

export default async function getAllProducts(req,res){
    const {limit} = req.query
    // const {page} = req.query
    // const {userId} = res.locals.session
    try {
        const productsArray = await productCollection.find().toArray()
        if (!limit) return res.send(productsArray)
        res.send(productCollection.slice(0,limit))

    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }

}