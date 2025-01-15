import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Components/Home';

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
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img src="https://ideogram.ai/assets/progressive-image/balanced/response/B7YxR4pMR5-vpJGREVdiOg" alt="Cineflix Logo" className="navbar-brand" style={{ width: '40px', height: '40px' }} />
          <a className="navbar-brand" href="#">Cineflix</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
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
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<h1>About</h1>} />
        <Route path='/contact' element={<h1>Contact</h1>} />
      </Routes>
    </Router>
  );
}

export default App;