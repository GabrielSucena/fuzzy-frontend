import React from "react";
import "./botao.css";

const Botao = ({ color, children, destino, onClick }) => {
  const button = (
    <button className={color} onClick={onClick}>
      {children}
    </button>
  );

  return destino ? (
    <a href={destino} className="link-botao">
      {button}
    </a>
  ) : (
    button
  );
};

export default Botao;
