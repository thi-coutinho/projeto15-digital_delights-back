import { cartsCollection, ordersCollection } from "../config/database.js";


//Payment section
export async function addPaymentMethod(req, res) {
    const {name, cardNumber, cvv, expDate} = req.body;
    const {user_id} = res.locals.session;
    //get user's cart
    const user = await cartsCollection.findOne({user_id})
    if (!user) {
        return res.status(404).send("User not found");
    }
    
        try {
            const order = await ordersCollection.insertOne({
                cart: [{
                    productId: user.productId, 
                    quantity: user.quantity 
                }],
                payment:[{
                    name,
                    cardNumber,
                    cvv,
                    expDate
                }]
            })
    
        return res.status(200).send(order);

        } catch (error) {
            res.status(500).send(error);
        }
}