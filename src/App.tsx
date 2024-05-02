// /src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import RadionicePage from './radionice/page';
import PredavaciPage from './predavaci/page';
import AdministracijaPage from './administracija/page';
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className="header">
          <h1>EDIT Code School</h1>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Naslovna</Link>
              </li>
              <li className="nav-item">
                <Link to="/radionice" className="nav-link">Radionice</Link>
              </li>
              <li className="nav-item">
                <Link to="/predavaci" className="nav-link">Predavači</Link>
              </li>
              <li className="nav-item">
                <Link to="/administracija" className="nav-link">Administracija</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/radionice" element={<RadionicePage />} />
          <Route path="/predavaci" element={<PredavaciPage />} />
          <Route path="/administracija" element={<AdministracijaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
