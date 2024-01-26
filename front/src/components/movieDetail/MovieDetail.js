import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MovieDetail = () => {
  const location = useLocation();
  const { id } = location.state;
  const [movie, setMovie] = useState({});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${id}`)
        if (!response.ok) {
          throw new Error('The request was not successful');
        }
        const movieData = await response.json()
        setMovie(movieData)
        setComments(movieData.comments || []);
      } catch (error) {
        console.error('something went wrong:', error);
      }

    }
    fetchData();
  }, [comments]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(`http://localhost:3000/movies/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const updatedMovie = await response.json();
      setComments(updatedMovie.comments || []); 
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container row mb-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:3000/images/${movie.image}`}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <label>Titulo:</label>
          <h2 className="mt-2 mb-4">{movie.title}</h2>
          <label>Descripcion:</label>
          <p className='mt-2 mb-4'>{movie.description}</p>
        </div>
      </div>
 {/* Sección de comentarios */}
 <div className="mt-4">
        <h4>Comentarios</h4>
        {comments.length === 0 ? (
          <p>Sin comentarios</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>{comment.text}</li>
            ))}
          </ul>
        )}

        {/* Agregar nuevo comentario */}
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Agrega un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleAddComment}>
          Agregar Comentario
        </button>
      </div>
    </div>
  );
};

export default MovieDetail