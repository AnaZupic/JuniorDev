import React, { useState, useEffect } from "react";
import "./RadionicePage.css";
import radioniceData from "../radionice.json";

interface Radionica {
  naziv: string;
  opis: string;
  prijave_otvorene_do: string;
  pocetak_radionice: string;
  trajanje_radionice: number;
}

interface Props {
  loggedIn: boolean;
}

const RadionicePage: React.FC<Props> = ({ loggedIn }) => {
  const [radionice, setRadionice] = useState<Radionica[]>([]);
  const [prijave, setPrijave] = useState<{ [key: string]: number }>({});
  const [filtriraniBrojPredavanja, setFiltriraniBrojPredavanja] = useState<number | null>(null);

  useEffect(() => {
    setRadionice(radioniceData);
  }, []);

  const handlePrijaviSe = (nazivRadionice: string) => {
    const confirmation = window.confirm(`Jeste li sigurni da se želite prijaviti na radionicu: ${nazivRadionice}?`);
    if (confirmation) {
      const newCount = (prijave[nazivRadionice] || 0) + 1;
      setPrijave(prevPrijave => ({
        ...prevPrijave,
        [nazivRadionice]: newCount,
      }));
  
      if (newCount === 10) {
        alert(`Radionica ${nazivRadionice} je popunjena!`);
      }
    }
  };  

  const handleFiltrirajPoPredavanjima = (brojPredavanja: number | null) => {
    setFiltriraniBrojPredavanja(brojPredavanja);
  };

  const filtriraneRadionice = filtriraniBrojPredavanja
    ? radionice.filter(radionica => radionica.trajanje_radionice === filtriraniBrojPredavanja)
    : radionice;

  return (
    <div className="radionice-page-container">
      <h2>RADIONICE</h2>
      <div className="filtriranje-container">
        <div className="filtriranje-kartica">
          <label htmlFor="brojPredavanja">Filtriraj radionice po broju predavanja: </label>
          <select id="brojPredavanja" onChange={e => handleFiltrirajPoPredavanjima(parseInt(e.target.value))}>
            <option value="">Sva predavanja</option>
            {[...new Set(radionice.map(radionica => radionica.trajanje_radionice))].map((brojPredavanja, index) => (
              <option key={index} value={brojPredavanja}>{brojPredavanja}</option>
            ))}
          </select>
        </div>
      </div>
      <ul className="radionice-list">
        {filtriraneRadionice.map((radionica, index) => (
          <li key={index} className="radionica-item">
            <strong>{radionica.naziv.toUpperCase()}</strong>
            <p>{radionica.opis}</p>
            <p><strong>Prijave otvorene do:</strong> {radionica.prijave_otvorene_do}</p>
            <p><strong>Početak radionice:</strong> {radionica.pocetak_radionice}</p>
            <p><strong>Trajanje radionice:</strong> {radionica.trajanje_radionice} predavanja</p>
            {loggedIn && (
              <button onClick={() => handlePrijaviSe(radionica.naziv)} id="tipka-prijavi-se">Prijavi se</button>
            )}
            <p><strong>Broj prijava:</strong> {prijave[radionica.naziv] || 0}/10</p>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default RadionicePage;
