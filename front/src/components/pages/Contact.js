import './Contact.css'
const Contact = () => {
  return (
    <div className="container cont_form">


        <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lcfaz0pAAAAADURPY6JIIiwpvtt1uZRiC-TDnyU"></script>
        <h1>Formulario de contacto</h1>
        <form id="contact_form" name="contact_form" method="post" >
          <div className="mb-3">
            <label htmlFor="email_addr">Email</label>
            <input type="email" required maxLength="50" className="form-control"
              id="email_addr" name="email" placeholder="usuario@deejemplo.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="name_input">Nombre</label>
            <input type="text" required maxLength="50" className="form-control"
              id="name_input" name="name" placeholder="Nombre" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_input">Teléfono</label>
            <input type="tel" required maxLength="50" className="form-control"
              id="phone_input" name="Phone" placeholder="Teléfono" />
          </div>
          <div className="mb-3">
            <label htmlFor="message">Mensaje</label>
            <textarea className="form-control" id="message" name="message" rows="3"></textarea>
          </div>
          <div className="my-4">
            <div className="g-recaptcha" data-sitekey="6Lcfaz0pAAAAADURPY6JIIiwpvtt1uZRiC-TDnyU"></div>
          </div>
          <button type="submit" className="btn btn-primary px-4">Enviar</button>
        </form>
    </div>
  );
}

export default Contact;
