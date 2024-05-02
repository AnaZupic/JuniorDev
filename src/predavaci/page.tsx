import React, { useState, useEffect } from 'react';
import '../App.css'; // Uvoz CSS datoteke
import predavaciData from '../predavaci.json';

interface Predavac {
  ime: string;
  predaje: string;
  radno_mjesto: string;
  zavrseno_obrazovanje: string;
}

const PredavaciPage: React.FC = () => {
  const [predavaci, setPredavaci] = useState<Predavac[]>([]);

  useEffect(() => {
    setPredavaci(predavaciData);
  }, []);

  return (
    <div className="predavaci-page-container"> {/* Dodana klasa predavaci-page-container */}
      <h2>Predavači</h2>
      <div className="predavaci-list"> {/* Dodana klasa predavaci-list */}
        {predavaci.map((predavac, index) => (
          <div className="predavac-card" key={index}> {/* Dodana klasa predavac-card */}
            <h3>{predavac.ime}</h3>
            <p>Predaje radionicu: {predavac.predaje}</p>
            <p>Radno mjesto: {predavac.radno_mjesto}</p>
            <p>Završeno obrazovanje: {predavac.zavrseno_obrazovanje}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PredavaciPage;
