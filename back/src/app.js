import express, { json } from 'express'
import Moviesrouter from './routes/movie.route.js'
import userRouter from './routes/user.route.js'
import mongoose from 'mongoose'
import db from './db/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { generateAndRenewKey } from './renewSecretKey.js'

dotenv.config()

const app = express();

app.use(json());

const puerto = process.env.PORT || 4000;

app.use(cors());

//Inicio la BD
db();

//Cada vez que inicio genero una SECRET_KEY
generateAndRenewKey();

app.get('/', (req, res) => {
    res.send('¡Hola desde mi primera aplicación Node.js!');
});

app.use(userRouter)
app.use(Moviesrouter);

// Error 404 si no existe ninguna ruta
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
})
app.use(express.static('public', { index: false }));

app.listen(puerto, () => {
    console.log(`Server running on port http://localhost:${puerto}`);
})