import { cartsCollection, ordersCollection } from "../config/database.js";


//Payment section
export async function addPaymentMethod(req, res) {
    const { name, cardNumber, cvv, expDate } = req.body;
    const { user_id } = res.locals.session;
    //get user's cart
    const userCart = await cartsCollection.findOne({ user_id })
    if (!userCart) {
        return res.status(404).send("User not found");
    }

    try {
        const paymentObject = {
            cart: { ...userCart }, payment: [{
                name,
                cardNumber,
                cvv,
                expDate
            }]
        };
        const order = await ordersCollection.insertOne(paymentObject);
        await cartsCollection.deleteOne({ user_id });
        return res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}