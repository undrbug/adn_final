import mongoose from "mongoose";

// Esquema para los comentarios
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
});

// Esquema principal de la película
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
