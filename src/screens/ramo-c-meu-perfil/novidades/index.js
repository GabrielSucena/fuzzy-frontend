import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./novidades.css"
import { faCode, faFireFlameSimple, faNetworkWired, faSadCry, faTools, faUser } from "@fortawesome/free-solid-svg-icons";
import TituloPagina from "../../../components/titulopagina";

function Novidades(){

    return(
    <>
    <TituloPagina titulopagina="Novidades" divisor2={true}/>
        <div className="novidades-conteiner-max">
            <div className="novidades-conteiner">
                <div className="novidades-superior">
                    <div className="quadrado">
                        <div className="emoji"><FontAwesomeIcon icon={faNetworkWired} className='icone-configuracoes'/></div>
                        <div className="escrita">31 funcionalidades</div>
                    </div>
                    <div className="quadrado">
                        <div className="emoji"><FontAwesomeIcon icon={faTools} className='icone-configuracoes'/></div>
                        <div className="escrita">6 Ferramentas</div>
                    </div>
                    <div className="quadrado">
                        <div className="emoji"><FontAwesomeIcon icon={faCode} className='icone-configuracoes'/></div>
                        <div className="escrita">5 Linguagens</div>
                    </div>
                    <div className="quadrado">
                        <div className="emoji"><FontAwesomeIcon icon={faFireFlameSimple} className='icone-configuracoes'/></div>
                        <div className="escrita">2 Frameworks</div>
                    </div>
                </div>
                <div className="novidades-inferior">
                    <p className="destaque">Lista de Funcionalidades</p>
                    <ol className="lista-ordenada">
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entrar com segurança</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sair com segurança</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trocar de senha</li>

                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultar documentação</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultar tutorial</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultar dúvidas frequentes</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultar novidades</li>

                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtrar colaboradores</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cadastrar colaborador</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Editar colaborador com justificativa</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Obsoletar colaborador com justificativa</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auditar colaborador</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extrair relatório PDF das informações principais do colaborador</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extrair relatório PDF dos treinamentos que o colaborador está</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notificar colaborador sobre pendências</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtrar cursos que o colaborador está</li>

                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtrar treinamentos</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cadastrar treinamento</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Editar treinamento com justificativa</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Obsoletar treinamento com justificativa</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auditar treinamento</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extrair relatório PDF das informações principais do treinamento</li>

                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar colaborador no treinamento</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Editar colaborador no treinamento com justificativa</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extrair relatório PDF dos colaboradores que estão no treinamento</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notificar do treinamento, todos os colaboradores sobre pendências</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anexar PDF atualizador de frequência aos colaboradores no treinamento</li>

                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtrar por opções na auditoria</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auditoria geral dos passos do sistema</li>
                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extrair resultados obtidos pelo filtro na auditoria por PDF</li>

                        <li className="lista-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Navegar por celular</li>
                    </ol>
                </div>
            </div>
        </div>
    </>
    )
}

export default Novidades;