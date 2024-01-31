import React, { useState, useRef } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { useAuth } from '../../utils/AuthContext.js';

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  //referencia para el focus()para el inicio de sesion
  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

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
          // 'Authorization': `Bearer ${token}`, // Agregar el token a la petición
        },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token)
        setShowToast(true); // si todo va ok muestro el toast
        setTimeout(() => {
          setShowToast(false); // lo oculto despues de 2 segundos
          navigate('/');
        }, 2000);
      } else {
        setShowErrorToast(true); // Mostrar el Toast de credenciales incorrectas
        setTimeout(() => {
          setShowErrorToast(false); // Ocultar el Toast después de 2 segundos
        }, 2000);
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
        <div className='d-flex gap-2 mb-5'>
          <button type="submit" className="btn btn-primary">Ingresar</button>
          <button type="button" className="btn btn-primary" onClick={handleOpenModal} >Registrarte</button>
        </div>
      </form>

      <RegisterModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
      {/* Toast para inicio de sesión correcto */}
      <div
        className={`toast align-items-center text-white bg-success ${showToast ? 'show' : ''} position-fixed top-50 start-50 translate-middle`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            ¡Inicio de sesión exitoso!
          </div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>

      {/* Toast para credenciales incorrectas */}
      <div
        className={`toast align-items-center text-white bg-danger ${showErrorToast ? 'show' : ''} position-fixed top-50 start-50 translate-middle`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">¡Credenciales incorrectas!</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowErrorToast(false)}
          ></button>
        </div>
      </div>

      <div className="dropdown-divider"></div>
    </div>
  )
}

export default Login;
