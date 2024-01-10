import express from 'express'
import { getAllMovies, getMovieByID, postMovie, putMovie, deleteMovieByID, searchMovies } from '../controllers/movie.controller.js'

const router = express.Router();

router.get('/movies', getAllMovies)

router.get('/movies/:id', getMovieByID)

router.post('/movies', postMovie)

router.put('/movies/:id', putMovie)

router.delete('/movies/:id', deleteMovieByID)

router.get('/searchAny', searchMovies)

export default router