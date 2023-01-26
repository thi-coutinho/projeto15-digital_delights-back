import bcrypt from 'bcrypt';
import { usersCollection } from '../config/database.js';


//SignUp section
export async function signUp(req, res) {
    const { name, email, password } = req.body;

    //check if user already exists
    const user = await usersCollection.findOne({
        email
    }).catch((err) => {
        console.log('erro no findone', err.message);
        return res.status(500).send('Internal server error');
    });

    if (user) {
        return res.status(400).send('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    await usersCollection.insertOne({
        name,
        email,
        password: hashedPassword
    });

    return res.status(200).send('User created');
}