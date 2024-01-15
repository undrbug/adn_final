import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

  return (
    <nav className="navbar bg-dark navbar-expand-lg border-bottom" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src="odin.jpg" alt="" className='logo' />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <Link className="nav-link active" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/about'>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to='/contact'>Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to='/login'>Login</Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;