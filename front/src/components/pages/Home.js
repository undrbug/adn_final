import './Home.css'
import { useEffect, useState } from 'react'
const Home = () => {

  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/movies')
      if (!response.ok) {
        throw new Error('The request was not successful');
      }
      const movies = await response.json()
      return movies;
    } catch (error) {
      console.error('something went wrong:', error);
    }
  }

  useEffect(() => {
    getMovies().then(movies => setMovies(movies))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="container mt-3">
      <h2 className="mb-4">TheMovies!</h2>

      <div className="row">

        <div className="col-10 mx-auto">

          <div>
            <div className="card-body">
              <h5 className="title">Últimos Estrenos</h5>
              {/* Contenido de los últimos estrenos */}
            </div>
          </div>
        </div>

        <div className="col-10 mx-auto">

          <div>
            <div className="card-body">

              <h5 className="title">Más Miradas</h5>

              <div className="container">
                <div className="row">
                  {movies.map((movie) => (
                    <div key={movie._id} className="col-md-4 mb-4">
                      <div className="card">
                        <img
                          src={`http://localhost:3000/images/${movie.image}`}
                          className="card-img-top"
                          alt={movie.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{movie.title}</h5>
                          <p className="card-text">{movie.description}</p>
                          <button className="btn btn-primary">Más información</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contenido de las películas más vistas */}
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4">Agregar / Eliminar Películas</h2>
      <div className="row mb-4">
        <div className="col">
          <button type="button" className="btn btn-success">Agregar Película</button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-danger">Eliminar Película</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
