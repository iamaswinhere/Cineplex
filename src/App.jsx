import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Components/Home';
import ContactForm from './Components/Contact';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
  };

  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: 'rgba(0,0,0,0.9)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
        <div className="container-fluid">
          <img src="https://ideogram.ai/assets/progressive-image/balanced/response/B7YxR4pMR5-vpJGREVdiOg" alt="Cineflix Logo" className="navbar-brand" style={{ width: '40px', height: '40px' }} />
          <a className="navbar-brand" href="#">Cineflix</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link mx-4" href="/">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link mx-4" href="/about">About</a>
            </li>
            <li className="nav-item">
            <a className="nav-link mx-4" href="/contact">Contact</a>
            </li>
          </ul>

            <form className="d-flex ms-auto" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} />} />
        <Route path='/contact' element={<ContactForm />} />
      </Routes>
    </Router>

    <footer className="bg-dark text-white p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">About Cineflix</a></li>
              <li><a href="/contact" className="text-white">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.instagram.com/aasww.in/" className="text-white">instagram</a></li>
              <li><a href="www.linkedin.com/in/aswin-raj-829342237" className="text-white">LinkedIn</a></li>
              <li><a href="https://www.fiverr.com/s/dD8eXB3" className="text-white">Fiverr</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <p>&copy; 2023 Cineflix. All rights reserved.</p>
        </div>
      </div>
    </footer>
                </>
  );
}

export default App;