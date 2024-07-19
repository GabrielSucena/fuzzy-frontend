import React from "react";
import "./botao.css";

const Botao = ({ color, children, destino, aoClicar }) => {
  const teste = () => {
    if (aoClicar) {
      aoClicar(); // Chama a função aoClicar, se estiver definida
    }
  };
  return (
    <>
      <a href={destino} className="link-botao">
        <button onClick={aoClicar} className={color}>
          {children}
        </button>
      </a>
    </>
  );
};

export default Botao;
