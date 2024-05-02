// /src/HomePage.tsx

import React, { useState } from 'react';
import './App.css'; // Import CSS file

interface Radionica {
  id: number;
  naziv: string;
}

const radionice: Radionica[] = [
  { id: 1, naziv: 'Cybersecurity' },
  { id: 2, naziv: 'Razvoj web aplikacija' },
  { id: 3, naziv: 'Uvod u backend' },
  { id: 4, naziv: 'Web dizajn' }
];

const HomePage: React.FC = () => {
  const [uloga, setUloga] = useState<'korisnik' | 'admin'>('korisnik');
  const [ime, setIme] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [prijavljeneRadionice, setPrijavljeneRadionice] = useState<Radionica[]>([]);

  const handlePrijava = (e: React.FormEvent) => {
    e.preventDefault();
    if (uloga === 'admin' && lozinka === 'admin1234') {
      setLoggedIn(true);
    } else if (uloga === 'korisnik') {
      setLoggedIn(true);
    } else {
      alert('Pogrešna lozinka!');
    }
  };

  const handleRadionicaPrijaviSe = (radionicaId: number) => {
    const radionica = radionice.find(r => r.id === radionicaId);
    if (radionica) {
      setPrijavljeneRadionice(prevState => [...prevState, radionica]);
    }
  };

  return (
    <div className="container">
      <h2>EDIT Code School</h2>
      <div className="form-container">
        <h3>Prijava</h3>
        <form onSubmit={handlePrijava}>
          <label>
            Prijava kao:
            <select className="select" value={uloga} onChange={(e) => setUloga(e.target.value as 'korisnik' | 'admin')}>
              <option value="korisnik">Registrirani korisnik</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          {uloga === 'korisnik' && (
            <div>
              <label>
                Ime i prezime:
                <input className="input" type="text" value={ime} onChange={(e) => setIme(e.target.value)} />
              </label>
            </div>
          )}
          {uloga === 'admin' && (
            <div>
              <label>
                Lozinka: admin1234
                <input className="input" type="password" value={lozinka} onChange={(e) => setLozinka(e.target.value)} />
              </label>
            </div>
          )}
          <button className="button" type="submit">Prijavi se</button>
        </form>
      </div>
      {loggedIn && uloga === 'korisnik' && (
        <div>
          <h3>Dobrodošli, {ime}!</h3>
          <h4>Radionice</h4>
          <ul>
            {radionice.map(radionica => (
              <li key={radionica.id}>
                {radionica.naziv}
                <button className="button" onClick={() => handleRadionicaPrijaviSe(radionica.id)}>Prijavi se</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {loggedIn && uloga === 'admin' && (
        <div>
          <h3>Prijavljeni ste kao admin</h3>
        </div>
      )}
      {loggedIn && uloga === 'korisnik' && (
        <div>
          <h4>Moje radionice</h4>
          <ul>
            {prijavljeneRadionice.map(radionica => (
              <li key={radionica.id}>{radionica.naziv}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;
