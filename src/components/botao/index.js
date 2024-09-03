import React from "react";
import "./botao.css";

const Botao = ({ color, children, destino, onClick }) => {
  /**
 * @function Botao
 * @since 2024
 * @version 3
 * @param {String} color - Cor do botão
 * @param {Undefined} children - Texto recebido dentro da tag no elemento pai
 * @param {String} destino - URL destino ao clicar no botão
 * @param {Function} onClick - Ação ao clicar no botão
 * @returns {} O elemento (div) em tela.
 * @description Botão do site, com ações e cores configuráveis.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */

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
