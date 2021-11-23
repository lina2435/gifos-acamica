import React, { useState } from "react";
import Header from "./header";
import Busqueda from "./busqueda";
import Resultados from "./resultados";
import "./styles.css";
//function App() {

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function reset() {
    setGifs([]);
    setLoading(false);
    setError(false);
    setBusqueda([]);
  }

  return (
    <div className={`App-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="App">
        <Header
          resetear={reset}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <Busqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          error={error}
          setError={setError}
          setGifs={setGifs}
          setLoading={setLoading}
        />
        <Resultados error={error} data={gifs} loading={loading} />
      </div>
    </div>
  );
}

// export default App;
