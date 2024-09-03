import "./carregando.css"
import logo from "../../carregador.svg"

function Carregando(){
/**
 * @function Carregando
 * @since 2024
 * @version 1
 * @returns {} O elemento (div) em tela.
 * @description Ícone Fuzzy com animação de carregamento.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */
    return (
        <div className="div-carregar">
          <img className="logo-carregar" src={logo} alt="Loading" />
        </div>
      );
    }

export default Carregando;