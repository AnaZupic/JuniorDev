import React from "react";
import { useParams } from "react-router-dom";
import predavaciData from "../predavaci.json";
import "./PredavacDetails.css";

const PredavacDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const predavac = id ? predavaciData[parseInt(id)] : null;

  if (!predavac) {
    return <div className="predavac-details-container">Predavač nije pronađen.</div>;
  }

  return (
    <div className="predavac-details-container">
      <div className="ime-i-podaci">
        <h1>Predavač: {predavac.ime}</h1>
        <div className="podaci-o-predavacu">
          <h2>Podaci o predavaču</h2>
          <p><strong>Radno mjesto:</strong> {predavac.radno_mjesto}</p>
          <p><strong>Završeno obrazovanje:</strong> {predavac.zavrseno_obrazovanje}</p>
        </div>
      </div>
      <div className="slika-predavaca">
        <img src={predavac.slika} alt="Slika nije uspješno učitana" />
      </div>
    </div>
  );
};

export default PredavacDetails;
