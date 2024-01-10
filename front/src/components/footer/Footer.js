import { Link } from 'react-router-dom';
import '../navBar/NavBar.css'
import React from 'react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px' }}>
      <div className="container">
        <div className="row">
          {/* Columna 1: Logo y Redes Sociales */}
          <div className="col-md-4">
            <div className="d-flex justify-content-center">
              <img src="odin.jpg" alt="Logo de la empresa" className='logo' />
            </div>
            <div className="social-icons mt-3 d-flex justify-content-center">
              <a href="http://facebook.es/" target="_blank" rel="noreferrer"><img width="48" height="48" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new" /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img width="48" height="48" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" /></a>
              <a href="https://wa.me/123456789" target="_blank" rel="noreferrer"><img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" /></a>
            </div>
          </div>

          {/* Columna 2: Links del Navbar */}
          <div className="col-md-4 d-flex justify-content-center">
            <ul className="list-unstyled">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Formulario de Suscripción */}
          <div className="col-md-4 mt-3">
            <form action="#" method="post">
              <label htmlFor="newsletter" className="text-white">Suscríbete al Newsletter:</label>
              <div className="py-2">
                <input type="email" className="form-control" id="newsletter" name="newsletter" placeholder="Tu correo electrónico" />
                <div className="input-group-append">
                  <button className="btn btn-border btn-outline-light" type="submit">Suscribirse</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}