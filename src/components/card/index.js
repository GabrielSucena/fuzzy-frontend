import "./card.css";
//import { Button } from "react-native-web";
import Botao from "../../components/botao";
import { Link } from "react-router-dom";

function Card(props) {
  const cTipo = props.tipo;
  const cDescricao = props.descricao;

  return (
    <div className="card">
      <h5 className="card-title">
        <b>{cTipo}</b>
      </h5>
      <p className="card-description">{cDescricao}</p>
      <div className="home-animation">
        <i className="fa fa-spinner fa-pulse fa-5x"></i>
      </div>
      <div className="botao-home-card">
        <Link to="/treinamentos">
          <Botao> Acessar </Botao>
        </Link>
      </div>
    </div>
  );
}

export default Card;
