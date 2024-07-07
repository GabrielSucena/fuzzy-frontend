import './rodape.css'
import { Link } from 'react-router-dom'

function Rodape(){
  return(
    <>
      <footer>
        <Link to = "/home" className="footer-logo"> <img className="footer-logo-image" src={`${process.env.PUBLIC_URL}/imagens/logohome.svg`} alt="Logo da Fuzzy"/> </Link>
        <h6>2024 - 2024 &copy; Todos os direitos reservados.</h6>
      </footer>
    </>
  )
}

export default Rodape
