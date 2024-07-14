import { useRef } from "react";  
import "./bannerhome.css";  
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGraduationCap, faPaintBrush, faPlay, faUser} from '@fortawesome/free-solid-svg-icons';  // Importação correta do ícone

function Bannerhome(props) {

    const navRef = useRef();
    // Elemento "navRef" escuta a função "useRef" padrão do React

    const showBannerhome = () => {
        navRef.current.classList.toggle("responsivo");  
        // Procura e chama no CSS a estrutura ID chamada ".responsivo", que entra como fosse o novo "class" do elemento <nav>
    };

    return (
        <header className="header-home">  
            <Link to = "/" className="header-logo"> <img className="header-logo-image" src={`${process.env.PUBLIC_URL}/imagens/logohome.svg`} alt="Logo da Fuzzy"/> </Link>
            {/*<img className="header-logo" src={`${process.env.PUBLIC_URL}/imagens/logohome.svg`} alt="Logo da Fuzzy"/>*/}
            <nav className='topicos' ref={navRef}> {/* Amarra os tópicos ao elemento "navRef" */}
                <a href="/auditoria"><FontAwesomeIcon icon={faPaintBrush} /> Auditoria</a>       
                <a href="/treinamentos"><FontAwesomeIcon icon={faPlay} /> Treinamentos</a>  {/* Utiliza o ícone correto */}
                <a href="/colaboradores"><FontAwesomeIcon icon={faGraduationCap} /> Colaboradores</a>       
                <a href="/perfil"><FontAwesomeIcon icon={faUser} /> Meu perfil</a>   
            </nav>
            <button className="botao-celular" onClick={showBannerhome}> {/* Ao clicar, chama a função "showBannerhome" */}
                <FontAwesomeIcon icon={faBars} color="#EBEBEB"/> 
            </button>
        </header>  
    );
}

export default Bannerhome;  // Exporta o componente Bannerhome como padrão
