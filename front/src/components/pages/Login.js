import React, { useState, useRef } from 'react';
import './Login.css'

const Login = () => {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    lastName:"",
    user:"",
    password:"",
    mail:"",
  })

  const [showModal, setShowModal] = useState(false)

  //referencia para el focus()
  //Inicio de sesion
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  //Registro
  const nameRef = useRef(null);

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

    console.log("Username:", user);
    console.log("Password:", password);
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

  // Registro de usuario
  const handleRegister = async (event) => {
    event.preventDefault();
    // Resto del código...
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

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registro de Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>

            <div className="modal-body">
              {/* Contenido del formulario de registro */}
              <form onSubmit={handleRegister}>
                {/* Resto del código... */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nombre"
                    // onChange={(event) => setNewUser(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Apellido"
                    // onChange={(event) => setNewUser(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newUser" className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newUser"
                    placeholder="Usuario"
                    // onChange={(event) => setNewUser(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newUserPassword" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newUserPassword"
                    placeholder="Contraseña"
                    // onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="correo@deEjemplo.com"
                    // onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>Cerrar</button>
              <button type="submit" className="btn btn-primary" onClick={handleRegister}>Registrase</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-divider"></div>
    </div>
  )
}

export default Login;
