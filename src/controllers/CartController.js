import { cartsCollection } from "../config/database.js";

export async function getCartProducts(req,res){
    const {user_id} = res.locals.session
    try {
        console.log(res.locals.session)
        const cart = await cartsCollection.findOne({user_id})
        const output = cart?.products || []
        res.send(output)
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }

}

export async function addProductToCart(req,res) {
    const {user_id} = res.locals.session  
    const {productId,price} = req.body
    try {
        let cart = await cartsCollection.findOne({user_id})
        if (!cart) { // se não achar carrinho cria um
            cart = await cartsCollection.insertOne({user_id,products:[{productId,price,quantity:1}]})
            res.status(201).send("Created Cart and added product")
        } else if (cart.products.filter(p=>p.productId===productId).length>0) { // se já tiver o prod incrementa a qtd
            const searchParams = {user_id:cart.user_id,"products.productId":productId}
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
    const {user_id} = res.locals.session  
    const {productId} = req.body
    try {
        let cart = await cartsCollection.findOne({user_id})
        const quantity = Number(cart.products.filter(p=>p.productId===productId)[0].quantity)
        console.log(cart.products.filter(p=>p.productId===productId)[0].quantity)
        if (!cart) {
            res.status(404).send("Cart not found")
        } else if (quantity>0) { // se já tiver o prod incrementa a qtd
            const searchParams = {user_id:cart.user_id,"products.productId":productId}
            await cartsCollection.updateOne(searchParams, {$inc:{"products.$.quantity":-1}})
            res.status(202).send("Decresed cart's product's quantity")
        } else { // se não tiver o prod adiciona
            res.status(403).send("Can't decrease product's quantity")
        }
    } catch (error) {
        res.status(500).send("Something went wrong in the server")
    }
}
