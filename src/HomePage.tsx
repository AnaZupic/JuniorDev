import React, { useState, useEffect } from "react";
import "./App.css";

interface Props {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: React.FC<Props> = ({ loggedIn, setLoggedIn }) => {
  const [uloga, setUloga] = useState<"korisnik" | "admin">("korisnik");
  const [ime, setIme] = useState("");
  const [lozinka, setLozinka] = useState("");


  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { uloga, ime } = JSON.parse(loggedInUser);
      setUloga(uloga);
      setIme(ime);
    }
  }, []);

  const handlePrijava = (e: React.FormEvent) => {
    e.preventDefault();
    if (uloga === "korisnik" && !ime) {
      alert("Niste unijeli ime.");
      return;
    }
    if (uloga === "korisnik") {
      setLoggedIn(true);
      localStorage.setItem("loggedInUser", JSON.stringify({ uloga, ime }));
    } else if (uloga === "admin" && lozinka === "admin1234") {
      setLoggedIn(true);
      localStorage.setItem("loggedInUser", JSON.stringify({ uloga }));
    } else {
      alert("Pogrešna lozinka!");
    }
  };

  const handleOdjava = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="container">
      <h2>EDIT Code School</h2>
      {loggedIn ? (
        <div>
          <h3>
            {uloga === "korisnik" ? "Dobrodošli, ${ime}!" : "Prijavljeni ste kao admin"}
          </h3>
          <button onClick={handleOdjava}>Odjava</button>
        </div>
      ) : (
        <div className="form-container">
          <h3>Prijavite se kako biste se mogli prijaviti na dostupne radionice.</h3>
          <form onSubmit={handlePrijava}>
            <label>
              Prijava kao:
              <select className="select" value={uloga} onChange={(e) => setUloga(e.target.value as "korisnik" | "admin"
              )}>
                <option value="korisnik">Registrirani korisnik</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            {uloga === "korisnik" && (
              <div>
                <label>
                  Ime i prezime:
                  <input className="input" type="text" value={ime} onChange={(e) => setIme(e.target.value)} />
                </label>
              </div>
            )}
            {uloga === "admin" && (
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
      )}
    </div>
  );
}

export default HomePage;
