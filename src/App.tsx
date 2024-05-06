import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import RadionicePage from "./radionice/page";
import PredavaciPage from "./predavaci/page";
import PredavacDetailsPage from "./predavaci_details/page";
import AdministracijaPage from "./administracija/page";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false); 

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
          <Route path="/" element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/radionice" element={<RadionicePage loggedIn={loggedIn} />} />
          <Route path="/predavaci" element={<PredavaciPage />} />
          <Route path="/predavac/:id" element={<PredavacDetailsPage />} />
          <Route path="/administracija" element={<AdministracijaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
