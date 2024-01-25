import Movie from "../models/movie.model.js";
import Comment from '../models/comment.model.js'

export const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const newComment = {
            text,
            user: req.user._id, // asocia al usuario actual
        };
        const movie = await Movie.findById(req.params.movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        movie.comments.push(newComment);
        await movie.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
};