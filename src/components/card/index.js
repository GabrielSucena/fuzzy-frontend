import "./card.css";
//import { Button } from "react-native-web";
import Botao from '../../components/botao';

function Card(props){

    const cTipo       = props.tipo
    const cDescricao  = props.descricao

    return(
        <div className="card">
            <h5 className="card-title"><b>{cTipo}</b></h5>
            <p className="card-description">{cDescricao}</p>
            <div className="home-animation">
                <i className="fa fa-spinner fa-pulse fa-5x"></i>
            </div>
            <div className="botao-home-card">
                <button className="botao-enfeite"> Acessar </button>
            </div>
            
        </div>
    )
}

export default Card;