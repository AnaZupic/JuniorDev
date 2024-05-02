import React, { useState, useEffect } from 'react';
import radioniceData from '../radionice.json';
import '../App.css'; // Uvoz CSS datoteke

interface Radionica {
  naziv: string;
  opis: string;
  prijave_otvorene_do: string;
  pocetak_radionice: string;
  trajanje_radionice: number;
}

const RadionicePage: React.FC = () => {
  const [radionice, setRadionice] = useState<Radionica[]>([]);

  useEffect(() => {
    setRadionice(radioniceData);
  }, []);

  return (
    <div className="radionice-page-container"> {/* Dodana klasa radionice-page-container */}
      <h2>Radionice</h2>
      <ul className="radionice-list"> {/* Dodana klasa radionice-list */}
        {radionice.map((radionica, index) => (
          <li key={index} className="radionica-item"> {/* Dodana klasa radionica-item */}
            <strong>{radionica.naziv.toUpperCase()}</strong>
            <p>{radionica.opis}</p>
            <p>Prijave otvorene do: {radionica.prijave_otvorene_do}</p>
            <p>Početak radionice: {radionica.pocetak_radionice}</p>
            <p>Trajanje radionice: {radionica.trajanje_radionice} predavanja</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RadionicePage;
