import Movie from '../models/movie.model.js'
import multer from 'multer'

const storage = multer.diskStorage({
    //Establecemos donde se van a guardar las imagenes
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads') //archivo subido u original
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop() //obtenemos solo la extension
        cb(null, `${Date.now()}.${ext}`)
    }
})
//middleware para el manejo de datos de formulario
//Crea un middleware de Multer configurado con las opciones proporcionadas
const upload = multer({ storage });

export const postMovie = async (req, res) => {
    try {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error(`Error al cargar la imagen: ${err.message}`);
                return res.status(400).json({ message: err.message });
            }

            const movie = new Movie({
                title: req.body.title,
                description: req.body.description,
                image: req.file.filename,
                user: '65b31c4fcbeb420042d54862',
            });
            const newMovie = movie.save();
            res.status(201).json(newMovie)
        });
    } catch (error) {
        console.error(`Error adding movie: ${error.message}`);
        res.status(400).json({ message: error.message });

    }
}

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();

        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMovieByID = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.json(movie)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const putMovie = async (req, res) => {
    const { id } = req.params
    const movie = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, movie, { new: true })
        res.json(updatedMovie)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteMovieByID = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
        res.json(deletedMovie)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const searchMovies = async (req, res) => {
    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: req.params.keyword, $options: 'i' } },
                { description: { $regex: req.params.keyword, $options: 'i' } }
            ]
        })
        res.json(movies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

