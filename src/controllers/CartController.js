import { cartsCollection } from "../config/database.js";

export async function getCartProducts(req,res){
    const {userId} = req.body
    try {
        const cart = await cartsCollection.findOne({userId})
        if (!cart) return res.status(404).send("Cart not found")
        res.send(cart.products)
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }

}

export async function addProductToCart(req,res) {
    const {userId} = req.body  
    const {productId,price} = req.body
    try {
        let cart = await cartsCollection.findOne({userId})
        console.log(cart)
        if (!cart) { // se não achar carrinho cria um
            cart = await cartsCollection.insertOne({userId,products:[{productId,price,quantity:1}]})
            res.status(201).send("Created Cart and added product")
        } else if (cart.products.filter(p=>p.productId===productId).length>0) { // se já tiver o prod incrementa a qtd
            const searchParams = {userId:cart.userId,"products.productId":productId}
            await cartsCollection.updateOne(searchParams, {$inc:{"products.$.quantity":1}})
            res.status(202).send("Incremented cart's product's quantity")
        } else { // se não tiver o prod adiciona
            await cartsCollection.updateOne(cart,{$set:{products:[...cart.products,{productId,price,quantity:1}]}})
            res.status(202).send("Add product to existing cart")
        }
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }
}

export async function delProductCart(req,res){
    const {userId} = req.body  
    const {productId} = req.body
    try {
        let cart = await cartsCollection.findOne({userId})
        const quantity = Number(cart.products.filter(p=>p.productId===productId)[0].quantity)
        console.log(cart.products.filter(p=>p.productId===productId)[0].quantity)
        if (!cart) {
            res.status(404).send("Cart not found")
        } else if (quantity>0) { // se já tiver o prod incrementa a qtd
            const searchParams = {userId:cart.userId,"products.productId":productId}
            await cartsCollection.updateOne(searchParams, {$inc:{"products.$.quantity":-1}})
            res.status(202).send("Decresed cart's product's quantity")
        } else { // se não tiver o prod adiciona
            res.status(403).send("Can't decrease product's quantity")
        }
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }
}