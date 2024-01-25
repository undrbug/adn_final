import React from 'react';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext.js';

function App() {
  return (
    <>
    <React.StrictMode>
      <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/about' Component={About} />
          <Route path='/contact' Component={Contact} />
          <Route path='/login' Component={Login} />
        </Routes>
        <Footer />
      </AuthProvider>
      </Router>
    </React.StrictMode>
    </>
  );
}

export default App;
