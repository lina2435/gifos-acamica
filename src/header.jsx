import React from "react";
import "./styles.css";
import LogoDesktop from "./assets/logo-desktop.svg";

export default function Header(props) {
  const manejarClick = () => {
    props.setIsDarkMode(!props.isDarkMode);
  };
  const manejarInicio = () => {
    props.resetear();
  };

  return (
    <div className="Header">
      <div className="logo">
        <button onClick={manejarInicio}>
          {<img src={LogoDesktop} alt="logo" />}
        </button>
      </div>
      <button onClick={manejarClick} className="btn-modo">
        MODO {`${props.isDarkMode ? "LIGHT" : "DARK"}`}
      </button>
    </div>
  );
}
