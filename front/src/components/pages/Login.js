import React, { useState } from 'react';
import './Login.css'

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  // Function to handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
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
  return (
    <div className="container cont_form">


      <form className="">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Usuario</label>
          <input
            type="text" className="form-control" id="userName" placeholder="Usuario" value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password" className="form-control" id="password" placeholder="Contraseña" value={password}
            onChange={(event) => setPassword(event.target.value)}
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
        <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Ingresar</button>
      </form>
      <div className="dropdown-divider"></div>




    </div>
  )
}

export default Login;
