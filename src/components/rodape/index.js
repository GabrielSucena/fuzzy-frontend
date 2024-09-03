import './rodape.css'
import { Link } from 'react-router-dom'

function Rodape(){
/**
 * @function Rodape
 * @since 2024
 * @version 1
 * @returns {} O elemento (div) em tela.
 * @description Rodapé padrão do site.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */
  return(
    <>
      <div className="main-content">
        {/* Conteúdo principal da página */}
      </div>
      <footer>
        <Link to="/home" className="footer-logo">
          <img className="footer-logo-image" src={`${process.env.PUBLIC_URL}/imagens/logohome.svg`} alt="Logo da Fuzzy"/>
        </Link>
        <h6>2024 - 2024 &copy; Todos os direitos reservados.</h6>
      </footer>
    </>
  )
}

export default Rodape
