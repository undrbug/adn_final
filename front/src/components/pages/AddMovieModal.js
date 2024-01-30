import React, { useState } from 'react';

function AddMovieModal({ showModal, handleCloseModal, handleAddMovie }) {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'description') {
      const capitalizedDescription = value
        .split('. ')
        .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. ');

      setNewMovie((prevMovie) => ({
        ...prevMovie,
        [name]: capitalizedDescription,
      }));
    } else {
      setNewMovie((prevMovie) => ({
        ...prevMovie,
        [name]: name === 'image' ? files[0] : value,
      }));
    }
  };

  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      style={{ display: showModal ? 'block' : 'none' }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!showModal}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Película
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <label>Título:</label>
            <input
              required
              type="text"
              className="form-control"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
            />
            <label>Descripción:</label>
            <textarea
              rows="3"
              className="form-control"
              name="description"
              value={newMovie.description}
              onChange={handleInputChange}
            ></textarea>
            <label>Imagen:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              name="image"
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleAddMovie(newMovie)}
            >
              Agregar Película
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovieModal;