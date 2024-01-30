import React, { useState } from 'react';
import './Contact.css'
const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza la validación de los campos aquí
    if (!formData.email || !formData.name || !formData.phone || !formData.message) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }

    // Aquí puedes enviar la información a tu servidor o realizar alguna acción
    console.log('Formulario enviado:', formData);
    // Limpia el estado del formulario después de enviarlo
    setFormData({
      email: '',
      name: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="container cont_form">
      <h1>Formulario de contacto</h1>
      <form id="contact_form" name="contact_form" method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email_addr">Email</label>
          <input
            type="email"
            required
            maxLength="50"
            className="form-control"
            id="email_addr"
            name="email"
            placeholder="usuario@deejemplo.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name_input">Nombre</label>
          <input
            type="text"
            required
            maxLength="50"
            className="form-control"
            id="name_input"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_input">Teléfono</label>
          <input
            type="tel"
            required
            maxLength="50"
            className="form-control"
            id="phone_input"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message">Mensaje</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="my-4">
          {/* Recaptcha */}
        </div>
        <button type="submit" className="btn btn-primary px-4">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
