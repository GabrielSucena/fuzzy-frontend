import styles from "./carregando.css"
import logo from "../../carregador.svg"

function Carregando(){

    return (
        <div className="div-carregar">
          <img className="logo-carregar" src={logo} alt="Loading" />
        </div>
      );
    }

export default Carregando;