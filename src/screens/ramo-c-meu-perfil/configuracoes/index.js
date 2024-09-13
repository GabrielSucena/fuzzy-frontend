import './configuracoes.css'
import TituloPagina from "../../../components/titulopagina";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBrain, faList, faNewspaper, faPaintRoller, faQuestion, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRole } from '../../../functionsCenter/RoleContext';

function Configuracoes(){
    const { role } = useRole();

    return(
        <>
            <TituloPagina titulopagina="Minhas configurações" divisor2={true}/>
            <div className='conteiner-configuracoes'>
                <div className='conteudo-configuracoes'>

                    <Link to='/perfil' className='remover'>
                        <div className='agrupamento-configuracoes'>
                            <div className='icone-configuracoes'>
                                <FontAwesomeIcon icon={faUser} className='icone-configuracoes'/>
                            </div>
                            <div className='escrita-configuracoes'>
                                <p className='titulo-configuracoes'>Perfil</p>
                                <p className='mensagem-configuracoes'>Veja dados do seu perfil e troque a sua senha</p>
                        </div>
                    </div>
                    </Link>

                    {role !== '[basic]' &&
                        <Link to='/documentacoes' className='remover'>
                            <div className='agrupamento-configuracoes'>
                                <div className='icone-configuracoes'>
                                    <FontAwesomeIcon icon={faBook} className='icone-configuracoes'/>
                                </div>
                                <div className='escrita-configuracoes'>
                                    <p className='titulo-configuracoes'>Documentação</p>
                                    <p className='mensagem-configuracoes'>Consulte os escopos e as funções mais utilizadas para manutenção</p>
                                </div>
                            </div>
                        </Link>
                    }

                    <Link to='/tutorial' className='remover'>
                        <div className='agrupamento-configuracoes'>
                            <div className='icone-configuracoes'>
                                <FontAwesomeIcon icon={faBrain} className='icone-configuracoes'/>
                            </div>
                            <div className='escrita-configuracoes'>
                                <p className='titulo-configuracoes'>Tutorial</p>
                                <p className='mensagem-configuracoes'>Saiba onde e como realizar cada ação dentro do site</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/duvidas' className='remover'>
                        <div className='agrupamento-configuracoes'>
                            <div className='icone-configuracoes'>
                                &nbsp;<FontAwesomeIcon icon={faQuestion} className='icone-configuracoes'/>
                            </div>
                            <div className='escrita-configuracoes'>
                                <p className='titulo-configuracoes'>&nbsp;Dúvidas frequentes</p>
                                <p className='mensagem-configuracoes'>&nbsp;Tire eventuais perguntas na nossa F.A.Q.</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/novidades' className='remover'>
                        <div className='agrupamento-configuracoes'>
                            <div className='icone-configuracoes'>
                                &nbsp;<FontAwesomeIcon icon={faNewspaper} className='icone-configuracoes'/>
                            </div>
                            <div className='escrita-configuracoes'>
                                <p className='titulo-configuracoes'>&nbsp;Novidades</p>
                                <p className='mensagem-configuracoes'>&nbsp;Versão Fuzzy 2.0 disponível!</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Configuracoes;