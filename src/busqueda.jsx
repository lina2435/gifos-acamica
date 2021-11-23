import React, { useState, useEffect } from "react";
import Search from "./assets/icon-search-mod-noc.svg";
import ImgBusqueda from "./assets/ilustra_header.svg";
import Error from "./error";

export default function Busqueda(props) {
  const [buscar, setBuscar] = useState(false);
  const [sugerencias, setSugerencias] = useState([]);
  const [autocompletar, setAutocompletar] = useState(true);

  const manejarCambio = (e) => {
    props.setBusqueda(e.target.value);
    let texto = e.target.value;
    if (texto.length > 1) {
      setAutocompletar(true);
    } else {
      setAutocompletar(false);
      setSugerencias([]);
      props.setError(false);
    }
  };
  const enviarPeticion = (e) => {
    e.preventDefault();
    setBuscar(true);
  };

  const manejarClick = (e) => {
    console.log(e);
    setAutocompletar(false);
    props.setBusqueda(e);
    setBuscar(true);
    setSugerencias([]);
  };

  useEffect(() => {
    if (buscar === true) {
      props.setLoading(true);
      let peticion = fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=1ITe3rXSyRBhWCpY4hYbuz26VfJbigPZ&limit=10&offset=0&rating=g&lang=en&q=" +
          props.busqueda
      );

      peticion
        .then((res) => {
          props.setLoading(false);
          return res.json();
        })
        .then((response) => {
          let isError = response.data.length === 0;
          props.setError(isError);
          setBuscar(false);
          props.setGifs(response.data);
        });
    }
  }, [buscar, props.busqueda, props]);

  useEffect(() => {
    if (autocompletar === true) {
      let peticion = fetch(
        "https://api.giphy.com/v1/gifs/search/tags?api_key=1ITe3rXSyRBhWCpY4hYbuz26VfJbigPZ&limit=5&offset=0&rating=g&lang=en&q=" +
          props.busqueda
      );

      peticion
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          let result = response.data.map((i) => {
            return i.name;
          });
          setSugerencias(result);
        });
    }
  }, [autocompletar, props.busqueda, props]);
  return (
    <div className="busqueda">
      <p>
        ¡Inspírate y busca los mejores <span className="bold">GIFS</span>!
      </p>
      <div>
        <img src={ImgBusqueda} alt="imagen" />
      </div>
      <div className="search">
        <form onSubmit={enviarPeticion}>
          <input
            value={props.busqueda}
            onChange={manejarCambio}
            type="text"
            placeholder="Busca gifs"
          />
          <button className="btn-search">
            <img src={Search} alt="Buscar" />
          </button>
        </form>

        <div className="autocomplete">
          {sugerencias.map((nombre) => {
            return (
              <p
                key={nombre}
                onClick={() => manejarClick(nombre)}
                className="autocomplete-item"
              >
                {" "}
                {nombre}{" "}
              </p>
            );
          })}
        </div>
        {props.error ? <Error /> : null}
      </div>
    </div>
  );
}
