import React, { useEffect, useState } from 'react';

function RegisterModal({
    //props
    showModal,
    handleCloseModal,
}) {
    // Estado para el nuevo usuario
    const [newUser, setNewUser] = useState({
        name: "",
        lastName: "",
        user: "",
        mail: "",
        password: "",
    });
    //Para ver u ocultar la contraseña (proximamente)
    // const [showPassword, setShowPassword] = useState(false);

    // Errores de campos de nuevo usuario
    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    // Función para restablecer el estado del usuario a los valores iniciales
    const resetForm = () => {
        setNewUser({
            name: "",
            lastName: "",
            user: "",
            mail: "",
            password: "",
        });
        setNameError("");
        setLastNameError("");
        setUserNameError("");
        setPasswordError("");
        setEmailError("");
    };

    // useEffect para limpiar los campos al montar el componente
    useEffect(() => {
        resetForm();
    }, []);

    // Validación del nombre y actualización del estado de error
    const handleNameChange = (event) => {
        let nameRegex = /^[a-zA-Záéíóúñ\s]+$/;
        if (!nameRegex.test(event.target.value.trim())) {
            setNameError("Nombre inválido, solo se permiten letras y espacios en blanco");
        } else {
            setNameError("");
        }
        setNewUser(prevUser => ({ ...prevUser, name: event.target.value }));
    };

    // Validación del apellido y actualización del estado de error
    const handleLastNameChange = (event) => {
        let nameRegex = /^[a-zA-Záéíóúñ\s]+$/;
        if (!nameRegex.test(event.target.value.trim())) {
            setLastNameError("Solo se permiten letras y espacios en blanco");
        } else {
            setLastNameError("");
        }
        setNewUser(prevUser => ({ ...prevUser, lastName: event.target.value }));
    };

    const handleUserNameChange = (event) => {
        let usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(event.target.value.trim())) {
            setUserNameError("Solo se permiten letras, números y guiones bajos");
        } else {
            setUserNameError("");
        }
        setNewUser((prevUser) => ({ ...prevUser, user: event.target.value }));
    }

    //Genera contraseña fuerte
    const handlePasswordChange = (event) => {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(event.target.value)) {
            setPasswordError("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial");
        } else {
            setPasswordError("");
        }
        setNewUser((prevUser) => ({ ...prevUser, password: event.target.value }));
    }

    //validador de direccion de mail
    const handleEmailChange = (event) => {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let email = event.target.value;
        if (!emailRegex.test(email)) {
            setEmailError("Email inválido");
        } else {
            setEmailError("");
        }
        setNewUser(prevUser => ({ ...prevUser, mail: event.target.value.toLowerCase() }));
    }

    const handleClose = () => {
        // Llama a resetForm al cerrar el formulario
        resetForm();
        // Cierra el modal
        handleCloseModal();
    };

    // Registro de usuario
    const handleRegister = async (event) => {
        event.preventDefault();

        // Validar los campos antes de enviar la solicitud al servidor
        if (!newUser.name || !newUser.lastName || !newUser.user || !newUser.password || !newUser.mail) {
            // Manejar el caso en que algún campo esté vacío
            alert("Todos los campos son obligatorios");
            return;
        }
        // Realizar la solicitud al servidor para registrar el usuario
        try {
            // Simulando una solicitud a un servidor con fetch
            const response = await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            // console.log('Respuesta del servidor:', await response.text());
            if (response.ok) {
                // Tengo que redirigir al home
                console.log('Usuario registrado exitosamente');
            } else {
                const errorData = await response.json();
                console.error('Error al registrar el usuario:', errorData.details || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
        handleClose();
    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registro de Usuario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                    </div>

                    <div className="modal-body">
                        {/* Formulario de registro */}
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nombre"
                                    value={newUser.name}
                                    onChange={(event) => handleNameChange(event)}
                                />
                                {nameError && <small className="text-danger">{nameError}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Apellido"
                                    value={newUser.lastName}
                                    onChange={(event) => handleLastNameChange(event)}
                                />
                                {lastNameError && <small className="text-danger">{lastNameError}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newUser" className="form-label">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newUser"
                                    placeholder="Usuario"
                                    value={newUser.user}
                                    onChange={(event) => handleUserNameChange(event)}
                                />
                                {userNameError && <small className="text-danger">{userNameError}</small>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="newUserPassword" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newUserPassword"
                                    placeholder="Contraseña"
                                    value={newUser.password}
                                    onChange={(event) => handlePasswordChange(event)}
                                />
                                {passwordError && <small className="text-danger">{passwordError}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="correo@deEjemplo.com"
                                    value={newUser.mail}
                                    onChange={(event) => handleEmailChange(event)}
                                />
                                {emailError && <small className="text-danger">{emailError}</small>}
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Cerrar</button>
                                <button type="submit" className="btn btn-primary">Registrase</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal