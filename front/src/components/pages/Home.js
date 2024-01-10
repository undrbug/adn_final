import './Home.css'
const Home = () => {
  return (
 <div className="container mt-3">
      <h2 className="mb-4">TheMovies!</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Últimos Estrenos</h5>
              {/* Contenido de los últimos estrenos */}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Más Miradas</h5>
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
