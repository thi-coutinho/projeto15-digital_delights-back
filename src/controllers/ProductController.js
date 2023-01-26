import { productsCollection } from "../config/database.js";

export default async function getAllProducts(req,res){
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