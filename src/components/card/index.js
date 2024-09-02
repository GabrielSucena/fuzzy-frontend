import "./card.css";
//import { Button } from "react-native-web";
import Botao from "../../components/botao";
import { Link } from "react-router-dom";

function Card( {tipo, descricao}) {

/**
 * @function Card
 * @since 2024
 * @version 2
 * @param {String} tipo - Título do card
 * @param {String} descricao - Chamada para ação do card
 * @returns {} O elemento (div) em tela.
 * @description Card visual para direcionamento de telas.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */

  const cTipo = tipo;
  const cDescricao = descricao;

    return(
        <div className="card">
            <h5 className="card-title"><b>{cTipo}</b></h5>
            <p className="card-description">{cDescricao}</p>
            <div className="conteiner-geral">
              <div className="conteiner-quadrados">
                  <div className="quadrados"></div>
                  <div className="quadrados"></div>
                  <div className="quadrados"></div>
                  <div className="quadrados"></div>
                  <div className="quadrados"></div>
              </div>
            </div>
            <div className="botao-home-card">
                <button className="botao-enfeite"> Acessar </button>
            </div>
            
        </div>
    )
}

export default Card;
