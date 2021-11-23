import React from "react";
import loadingicon from "./assets/loading.png";
import Gifcard from "./gifcard";

export default function Resultados(props) {
  return (
    <div className="Resultados">
      {props.loading === false &&
      props.data.length === 0 &&
      props.error === false ? (
        <p>¡Ey, busca el Gif que desees!</p>
      ) : null}

      {props.loading ? (
        <div className="loading">
          {" "}
          <img src={loadingicon} alt="loading" />
        </div>
      ) : null}

      {props.data.length > 0 ? "Resultados de tu búsqueda" : null}

      <div className="GifContainer">
        {props.data.map((gif) => {
          return (
            <Gifcard key={gif.id} urlGif={gif.images.downsized_medium.url} />
          );
        })}
      </div>
    </div>
  );
}
