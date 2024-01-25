import express from 'express';
import { createComment } from '../controllers/comment.controller.js';

const router = express.Router();

// Ruta para crear un comentario en una película específica
router.post('/movies/:movieId/comments', createComment);

export default router;