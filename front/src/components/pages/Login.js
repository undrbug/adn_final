import './Login.css'
const Login = () => {
  return (
    <div className="container cont_form">


        <form className="">
          <div className="mb-3">
            <label for="exampleDropdownFormEmail1" class="form-label">Email</label>
            <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="usuario@deejemplo.com" />
          </div>
          <div className="mb-3">
            <label for="exampleDropdownFormPassword1" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Contraseña" />
          </div>
          <div className="mb-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="dropdownCheck" />
              <label className="form-check-label" for="dropdownCheck">
                Recordarme
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>
        <div className="dropdown-divider"></div>




    </div>
  )
}

export default Login;
