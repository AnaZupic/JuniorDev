import React, { useState, useEffect } from "react";
import "./AdministracijaPage.css"; 
import radioniceData from "../radionice.json";

interface Radionica {
  naziv: string;
  opis: string;
  prijave_otvorene_do: string;
  pocetak_radionice: string;
  trajanje_radionice: number;
}

const AdministracijaPage: React.FC = () => {
  const [radionice, setRadionice] = useState<Radionica[]>([]);
  const [novaRadionica, setNovaRadionica] = useState<Radionica>({
    naziv: "",
    opis: "",
    prijave_otvorene_do: "",
    pocetak_radionice: "",
    trajanje_radionice: 0,
  });

  useEffect(() => {
    setRadionice(radioniceData);
  }, []);

  const handleIzbrisiRadionicu = (nazivRadionice: string) => {
    const confirmDelete = window.confirm("Jeste li sigurni da želite izbrisati radionicu: ${nazivRadionice}?");
    if (confirmDelete) {
      const updatedRadionice = radionice.filter(radionica => radionica.naziv !== nazivRadionice);
      setRadionice(updatedRadionice);
    }
  };

  const handleDodajNovuRadionicu = () => {
    if (
      novaRadionica.naziv.trim() === "" ||
      novaRadionica.opis.trim() === "" ||
      novaRadionica.prijave_otvorene_do.trim() === "" ||
      novaRadionica.pocetak_radionice.trim() === "" ||
      novaRadionica.trajanje_radionice === 0
    ) {
      alert("Morate unijeti sve podatke za dodavanje nove radionice.");
      return;
    }

    
    setRadionice(prevRadionice => [...prevRadionice, novaRadionica]);
    setNovaRadionica({
      naziv: "",
      opis: "",
      prijave_otvorene_do: "",
      pocetak_radionice: "",
      trajanje_radionice: 0,
    });
  };

  const handleChangeNovuRadionicu = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaRadionica(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">ADMINISTRACIJA</h2>
      <div className="admin-radionice-container">
        <h3 className="admin-subheading">Radionice</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Prijave otvorene do</th>
              <th>Početak radionice</th>
              <th>Trajanje radionice</th>
              <th>Izbriši</th>
            </tr>
          </thead>
          <tbody>
            {radionice.map((radionica, index) => (
              <tr key={index}>
                <td>{radionica.naziv}</td>
                <td>{radionica.opis}</td>
                <td>{radionica.prijave_otvorene_do}</td>
                <td>{radionica.pocetak_radionice}</td>
                <td>{radionica.trajanje_radionice}</td>
                <td>
                  <button className="delete-button" onClick={() => handleIzbrisiRadionicu(radionica.naziv)}>Izbriši</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-dodaj-radionicu-container">
        <h3 className="admin-subheading">Dodaj novu radionicu</h3>
        <form>
          <label>
            Naziv:
            <input type="text" name="naziv" value={novaRadionica.naziv} onChange={handleChangeNovuRadionicu} />
          </label>
          <label>
            Opis:
            <textarea name="opis" value={novaRadionica.opis} onChange={handleChangeNovuRadionicu} />
          </label>
          <label>
            Prijave otvorene do:
            <input type="text" name="prijave_otvorene_do" value={novaRadionica.prijave_otvorene_do} onChange={handleChangeNovuRadionicu} />
          </label>
          <label>
            Početak radionice:
            <input type="text" name="pocetak_radionice" value={novaRadionica.pocetak_radionice} onChange={handleChangeNovuRadionicu} />
          </label>
          <label>
            Trajanje radionice:
            <select name="trajanje_radionice" value={novaRadionica.trajanje_radionice} onChange={handleChangeNovuRadionicu}>
              <option value={5}>5 predavanja</option>
              <option value={10}>10 predavanja</option>
            </select>
          </label>
          <button className="add-button" type="button" onClick={handleDodajNovuRadionicu}>Dodaj</button>
        </form>
      </div>
    </div>
  );
}

export default AdministracijaPage;
