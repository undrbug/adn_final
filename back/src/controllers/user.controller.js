import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// dotenv.config()

const router = express.Router()

//Generacion token (Paso 4)
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

// Registro usuario (Paso 1)
export const userRegister = async (req, res) => {
    try {
        // Hago un Hash de la contraseña que viene en el body request
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Creo un nuevo usuario
        const newUser = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            user: req.body.user,
            mail: req.body.mail,
            // Con el Hash de la contraseña
            password: hashedPassword
        })
        newUser.save()
        res.status(201).json({ message: 'Successfully registered user' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
}

//Login usuario (Paso 2)
export const userLogin = async (req, res) => {
    try {
        const { user, password } = req.body
        // buscamos un usuario en la bd
        const userFound = await User.findOne({ user })
        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if (userFound && passwordMatch) {
            // generamos el token JWT
            const token = generateToken(userFound._id)
            // res.status(200).json({ message: `Welcome, ${userFound.name}` });
            //Devolvemos el toke al front (Paso 6)
            res.status(200).json({ token: generateToken(user._id) });
        } else {
            res.status(401).json({ error: 'Incorrect credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'failed to login' });
    }
}

//Verificar token (Paso 5)
export const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    })
}