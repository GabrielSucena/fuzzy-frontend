import { useEffect, useRef, useState } from "react";  
import "./bannerhome.css";  
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGraduationCap, faPaintBrush, faPlay, faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';  // Importação correta do ícone
import { useRole } from '../../functionsCenter/RoleContext'; // Corrija o caminho conforme necessário



function Bannerhome( ) {
    const { role } = useRole(); // Obtém o role do contexto
    const vermelho = getComputedStyle(document.documentElement).getPropertyValue('--vermelho').trim();
    const navRef = useRef();
    // Elemento "navRef" escuta a função "useRef" padrão do React

    const showBannerhome = () => {
        navRef.current.classList.toggle("responsivo");  
        // Procura e chama no CSS a estrutura ID chamada ".responsivo", que entra como fosse o novo "class" do elemento <nav>
    };

    function logOut() {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('role'); 
        setTimeout(() => {Navigate('/login');}, 1000); 
    }

    return (
        <header className="header-home">  
            <Link to = "/" className="header-logo"> <img className="header-logo-image" src={`${process.env.PUBLIC_URL}/imagens/logohome.svg`} alt="Logo da Fuzzy"/> </Link>
            {/*<img className="header-logo" src={`${process.env.PUBLIC_URL}/imagens/logohome.svg`} alt="Logo da Fuzzy"/>*/}
            <nav className='topicos' ref={navRef}> {/* Amarra os tópicos ao elemento "navRef" */}          
            {(role === '[admin]' || role === '[manager]') && (
                <>
                    <a href="/auditoria"><FontAwesomeIcon icon={faPaintBrush} />&nbsp;&nbsp;Auditoria</a>
                    <a href="/treinamentos"><FontAwesomeIcon icon={faPlay} />&nbsp;&nbsp;Treinamentos</a>  
                    <a href="/colaboradores"><FontAwesomeIcon icon={faGraduationCap} />&nbsp;&nbsp;Colaboradores</a> 
                </>
            )}

                <a href="/perfil" className="perfil-bannerhome"><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;Meu perfil</a>  
                <a href="/login" className="sair" onClick={logOut} style={{ color: vermelho, textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faRightFromBracket} style={{ color: vermelho }} />
                    &nbsp;&nbsp;SAIR
                    </a>
            </nav>
            <button className="botao-celular" onClick={showBannerhome}> {/* Ao clicar, chama a função "showBannerhome" */}
                <FontAwesomeIcon icon={faBars} color="#EBEBEB"/> 
            </button>
        </header>  
    );
}

export default Bannerhome;  // Exporta o componente Bannerhome como padrão
