import './About.css'
const About = () => {
  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-lg-6">
        <h2 className="mb-4">¡Bienvenido a nuestra web de películas!</h2>
        <p className="lead">
          En <strong>OdinFlix</strong>, nos apasiona el séptimo arte. Nuestra misión es proporcionarte la mejor
          experiencia cinematográfica. Desde clásicos atemporales hasta los últimos estrenos, ¡tenemos todo para
          satisfacer tu sed de cine!
        </p>
        <p>
          ¿Qué nos hace diferentes? No solo somos fanáticos del cine, sino que también nos dedicamos a ofrecerte
          recomendaciones personalizadas, noticias emocionantes del mundo del cine y mucho más. Nuestra comunidad de
          amantes del cine está creciendo cada día.
        </p>
      </div>
      <div className="col-lg-6">
        <img
          src="top10.jpeg"
          alt="OdinFlix Movie Reel"
          className="img-fluid rounded"
        />
      </div>
    </div>

    <div className="row mt-5">
      <div className="col-lg-12">
        <h3>¿Qué encontrarás en OdinFlix?</h3>
        <ul className="list-unstyled">
          <li>
            🍿 <strong>Amplia selección:</strong> Desde clásicos hasta los últimos lanzamientos.
          </li>
          <li>
            🎥 <strong>Recomendaciones personalizadas:</strong> Descubre nuevas joyas cinematográficas basadas en tus
            gustos.
          </li>
          <li>
            🎉 <strong>Eventos exclusivos:</strong> Participa en estrenos, charlas con directores y más.
          </li>
          <li>
            🎬 <strong>Noticias del cine:</strong> Mantente actualizado con las últimas novedades de Hollywood.
          </li>
        </ul>
      </div>
    </div>
  </div>
);
};

export default About;
