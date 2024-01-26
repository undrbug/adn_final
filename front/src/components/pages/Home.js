import './Home.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MovieDetail from '../movieDetail/MovieDetail';

const Home = () => {

  const [movies, setMovies] = useState([])
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    image: null,
  });

  const [showModal, setShowModal] = useState(false)

  //Estados para la eliminacion de la pelicula
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  //Manejo de errores en la carga de las peliculas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Estado para filtro de pelicula
  const [searchTerm, setSearchTerm] = useState('');

  //Metodo para traer todas las peliculas
  const getMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/movies')
      if (!response.ok) {
        throw new Error('The request was not successful');
      }
      const movies = await response.json()

      // filtro las películas según la búsqueda
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setMovies(filteredMovies)
      setLoading(false);

      // return movies;
    } catch (error) {
      console.error('something went wrong:', error);
      setError('There was an error loading the movies.');
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   getMovies().then(movies => {
  //     setMovies(movies)
  //     setLoading(false)
  //   })
  //     .catch(error => {
  //       console.error('Error fetching movies:', error);
  //       setError('There was an error loading the movies.');
  //       setLoading(false);
  //     })
  // })

  useEffect(() => {
    getMovies();
  }, [searchTerm]);

  //Capturo lo que se va ingresando en el modal "Agregar pelicula"
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    // Capitalizo la primera letra de cada oración en la descripcion
    if (name === 'description') {
      const capitalizedDescription = value
        .split('. ') // Divido por puntos y espacios para obtener todas las oraciones
        .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. '); // Vuelvo a unir las oraciones

      setNewMovie((prevMovie) => ({
        ...prevMovie,
        [name]: capitalizedDescription,
      }));
    } else {
      // Para los otros campos simplemente actualizo el estado
      setNewMovie((prevMovie) => ({
        ...prevMovie,
        [name]: name === 'image' ? files[0] : value,
      }));
    }
  };

  //Para agregar una nueva pelicula a la bd
  const handleAddMovie = async (event) => {
    console.log('Antes de agregar película - newMovie.image:', newMovie.image);
    try {
      // Valido que todos los campos obligatorios estén cargados
      if (!newMovie.title || !newMovie.description || !newMovie.image) {
        alert('Completa todos los campos antes de agregar la película');
        return;
      }

      const formData = new FormData();
      formData.append('title', newMovie.title.toUpperCase());
      formData.append('description', newMovie.description);
      formData.append('image', newMovie.image);
      const res = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const addedMovie = await res.json();
      setMovies((prevMovie) => [...prevMovie, addedMovie]);
      alert('Film added successfully!');
      handleCloseModal(); //Cierro el modal despues de agregar la pelicula

    } catch (error) {
      console.error('Error adding movie', error);
      alert('Error adding movie');
    }
    console.log('Después de agregar película - newMovie.image:', newMovie.image);
  };


  //Para eliminar una pelicular de la bd
  const handleDeleteMovie = async (movieId) => {
    try {
      const res = await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      // filtro las películas para eliminar la película con el ID
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      alert('Film deleted successfully!');
    } catch (error) {
      console.error('Error deleting movie', error);
      alert('Error deleting movie');
    }
  };

  //Abrimos el modal de confirmacion
  const handleOpenDeleteModal = (movieId) => {
    setMovieToDelete(movieId);
    setShowDeleteModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal sin agregar película
  };

  const handleOpenModal = () => {
    setNewMovie({ // Limpiar el formulario antes de abrir el modal
      title: '',
      description: '',
      image: null,
    });
    setShowModal(true); // Abrir el modal
  };

  const handleSearch = () => {
    // actializa la búsqueda y vuelve a obtener las películas
    getMovies();
  };

  return (
    <>
      <div className="container mt-3">

        {/* Input para la búsqueda */}
        <input
          type="text"
          className="form-control-sm"
          placeholder="Buscar películas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <h2 className="mb-4">TheMovies!</h2>
        <div className="row">

          <div className="col-10 mx-auto">

            <div>
              <div className="card-body">
                <h5 className="title">Últimos Estrenos</h5>
                {!movies ? <h1>Todavia nada por aqui</h1> : <h1>Pronto todos los estrenos estaran aquí</h1>}
                {/* Contenido de los últimos estrenos */}
              </div>
            </div>
          </div>

          <div className="col-10 mx-auto">

            <div>
              <div className="card-body">

                <h5 className="title">Más Vistas</h5>
                {loading ? (
                  <p>Cargando peliculas</p>
                ) : error ? (
                  <p>{error}</p>
                ) : movies ? (
                  <div className="container">
                    <div className="row">
                      {movies.map((movie) => (
                        <div key={movie._id} className="col-md-4 mb-4">
                          <div className="card">
                            <img
                              src={`http://localhost:3000/images/${movie.image}`}
                              className="card-img-top"
                              alt={movie.title} />
                            <div className="card-body">
                              <h5 className="card-title">{movie.title}</h5>
                              <p className="card-text">{movie.description}</p>
                              <div className='d-flex gap-2 mb-3'>
                                {/* <button className="btn btn-primary">Ver más...</button> */}
                                <Link to={`/detail`} state={{id: movie._id}} className="btn btn-primary">
                                  Ver más...
                                </Link>
                                <button className="btn btn-danger"
                                  onClick={() => handleOpenDeleteModal(movie._id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                  </svg></button>

                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <h1>Todavia nada por aqui</h1>
                )}
                {/* Contenido de las películas más vistas */}
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-4">Agregar / Eliminar Películas</h2>
        <div className="row mb-4">
          <div className="col">
            <button
              type="button" className="btn btn-success" onClick={() => handleOpenModal()}>
              Agregar Película
            </button>
          </div>
          <div className="col">
            {/* //Todavia sin funciones */}
            <button
              type="button" className="btn btn-danger">
              Eliminar Película
            </button>
          </div>
        </div>
      </div>

      {/* //Modal para agregar pelicula */}
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
                onClick={() => handleCloseModal()}
              ></button>
            </div>
            <div className="modal-body">
              {/* Contenido del formulario */}
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
                onClick={() => handleCloseModal()}
              >
                Cerrar
              </button>

              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddMovie}
              >
                Agregar Película
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* //Modal para eliminar pelicula */}
      <div
        className={`modal fade ${showDeleteModal ? 'show' : ''}`}
        style={{ display: showDeleteModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden={!showDeleteModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirmación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar esta película?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  handleDeleteMovie(movieToDelete);
                  setShowDeleteModal(false);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
