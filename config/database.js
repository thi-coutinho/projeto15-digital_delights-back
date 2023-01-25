import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

//database connection
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL)

try {
    await mongoClient.connect();
    db = mongoClient.db()
} catch (error) {
    console.log('Cannot connect to the server');
}

export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
export const productsCollection = db.collection('products');
export const cartsCollection = db.collection('carts');
export const ordersCollection = db.collection('orders');

export default db;
