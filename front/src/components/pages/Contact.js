import './Contact.css'
const Contact = () => {
  return (
    <div className="container cont_form">
      <form className="">


        <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lcfaz0pAAAAADURPY6JIIiwpvtt1uZRiC-TDnyU"></script>
        <h1>Formulario de contacto</h1>
        <form id="contact_form" name="contact_form" method="post" >
          <div className="mb-3">
            <label for="email_addr">Email</label>
            <input type="email" required maxlength="50" class="form-control"
              id="email_addr" name="email" placeholder="usuario@deejemplo.com" />
          </div>
          <div className="mb-3">
            <label for="name_input">Nombre</label>
            <input type="text" required maxlength="50" class="form-control"
              id="name_input" name="name" placeholder="Nombre" />
          </div>
          <div className="mb-3">
            <label for="phone_input">Teléfono</label>
            <input type="tel" required maxlength="50" class="form-control"
              id="phone_input" name="Phone" placeholder="Teléfono" />
          </div>
          <div className="mb-3">
            <label for="message">Mensaje</label>
            <textarea class="form-control" id="message" name="message" rows="3"></textarea>
          </div>
          <div className="my-4">
            <div class="g-recaptcha" data-sitekey="6Lcfaz0pAAAAADURPY6JIIiwpvtt1uZRiC-TDnyU"></div>
          </div>
          <button type="submit" class="btn btn-primary px-4">Enviar</button>
        </form>
      </form>
    </div>
  );
}

export default Contact;
