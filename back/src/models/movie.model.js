import mongoose from "mongoose";
import { commentSchema } from "./comment.model.js";

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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },    
    comments: [commentSchema],
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
