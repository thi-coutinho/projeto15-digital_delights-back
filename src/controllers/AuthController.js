import bcrypt from 'bcrypt';
import { usersCollection, sessionsCollection } from '../config/database.js';
import {v4 as uuid} from 'uuid';




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

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const emailExists = await usersCollection.findOne({ email })

        if (!emailExists) return res.status(400).send("Usuário ou senha inválidos")

        const hashPassword = bcrypt.compareSync(password, emailExists.password)

        if (!hashPassword) return res.status(400).send("Usuário ou senha inválidos")

        const token = uuid()

        await sessionsCollection.insertOne({ user_id: emailExists._id, token})

        return res.status(200).send({ token })

    } catch (err) {
        res.status(500).send(err)
    }
}