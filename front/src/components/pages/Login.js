import React, { useState, useRef } from 'react';
import './Login.css'
import RegisterModal from './RegisterModal';

const Login = () => {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  
  const [showModal, setShowModal] = useState(false)

  //referencia para el focus()para el inicio de sesion
  const userRef = useRef(null);
  const passwordRef = useRef(null);

  // Inicio de sesion
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Valido que todos los campos obligatorios estén cargados
    if (user.trim() === "" || password.trim() === "") {
      alert('Completa los datos');

      // Enfocar en el primer campo vacío
      if (user.trim() === "") {
        userRef.current.focus();
      } else {
        passwordRef.current.focus();
      }

      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log(`El token es: ${token}`);

      } else {
        const errorData = await response.json();
        console.error('Error en el inicio de sesión:', errorData.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

  };

  // Abro el modal de registro
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Cierro el modal de registro
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    //form de inicion de sesion
    <div className="container cont_form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="Usuario"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            ref={userRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            ref={passwordRef}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="dropdownCheck" />
            <label className="form-check-label" htmlFor="dropdownCheck">
              Recordarme
            </label>
          </div>
        </div>
        <div className='d-flex gap-2'>
          <button type="submit" className="btn btn-primary">Ingresar</button>
          <button type="button" className="btn btn-primary" onClick={handleOpenModal} >Registrarte</button>
        </div>
      </form>

      <RegisterModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />      
      <div className="dropdown-divider"></div>
    </div>
  )
}

export default Login;
