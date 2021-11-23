import React from "react";
export default function Gifcard(props) {
  return (
    <div className="gifCard">
      <img height="100%" width="100%" src={props.urlGif} alt="gif" />
    </div>
  );
}
