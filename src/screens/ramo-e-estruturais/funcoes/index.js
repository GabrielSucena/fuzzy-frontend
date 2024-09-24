import Funcao from '../../../components/funcao';
import TituloPagina from '../../../components/titulopagina'
import './funcoes.css'

function Funcoes(){

    return(
    <>
    
        <TituloPagina titulopagina='Documentação' descricaotitulo='Componentes primordiais das páginas (Feito para desenvolvedores)' divisor2={true}/>
        <div className='content-auditoria'>
            <div className='funcoes-auditoria'>
            <Funcao
                titulo='Auditoria(titulo, subtitulo, entidade, tipo)'
                descricao='Auditoria de todas as ações realizadas sobre os cursos, colaboradores e colaboradores dentro de cursos.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['titulo', 'String', 'Título da auditoria'],
                ['subtitulo', 'String', 'Descrição da auditoria'],
                ['entidade', 'String', 'ID da entidade'],
                ['tipo', 'String', 'Deve ser "curso" ou "colaborador"']
                ]}
                retorno='A auditoria do tipo específico'
            />

            <Funcao
                titulo='Banner()'
                descricao='Banner responsivo da tela quando o usuário não está autenticado. Para mais informações, veja a documentação do React.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='Bannerhome()'
                descricao='Banner responsivo da tela quando o usuário está autenticado. Para mais informações, veja a documentação do React.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='BoasVindas(nome)'
                descricao='Modelo centralizado que dá as boas vindas ao usuário com a saudação do período do dia vigente.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['nome', 'String', 'Nome do usuário logado']
                ]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='Botao(color, children, destino, onClick)'
                descricao='Botão do site, com ações e cores configuráveis.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['color', 'String', 'Cor do botão'],
                ['children', 'Undefined', 'Texto recebido dentro da tag no elemento pai'],
                ['destino', 'String', 'URL destino ao clicar no botão'],
                ['onClick', 'function', 'Ação ao clicar no botão']
                ]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='Card(tipo, descricao)'
                descricao='Card visual para direcionamento de telas.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['tipo', 'String', 'Título do card'],
                ['descricao', 'String', 'Chamada para ação do card']
                ]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='Carregando()'
                descricao='Ícone Fuzzy com animação de carregamento.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='Modal(isOpen, text, acaoColaborador, acaoDepartamento, complement, way, buttons, actions, reason, onConfirm, onCancel)'
                descricao='Modais do site.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['isOpen', 'Boolean', 'Se o modal está ativo'],
                ['text', 'String', 'Texto inicial do modal'],
                ['acaoColaborador', 'function', 'Ação a ser realizada sobre o colaborador'],
                ['acaoDepartamento', 'function', 'Ação a ser realizada sobre o colaborador'],
                ['complement', 'String', 'Texto final do modal'],
                ['way', 'Boolean', 'Se há os botões de inclusão'],
                ['buttons', 'Boolean', 'Se há os botões de inclusão genéricos'],
                ['actions', 'Boolean', 'Botões de fechamento ou confirmação do modal'],
                ['reason', 'String', 'Campo para inclusão de justificativa se a ação for exclusão'],
                ['onConfirm', 'function', 'Ação realizada ao clicar no confirmar do modal'],
                ['onCancel', 'function', 'Ação realizada ao clicar no cancelar do modal']
                ]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='Rodape()'
                descricao='Rodapé padrão do site.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='TituloPagina(titulopagina, descricaotitulo, divisor1, divisor2, botao1, color1, destino1, onclick1, botao2, color2, destino2, onclick2, botao3, color3, destino3, onclick3)'
                descricao='Título, descrição e botões padrão do topo das páginas.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['titulopagina', 'String', 'Título da página'],
                ['descricaotitulo', 'String', 'Descrição da página'],
                ['divisor1', 'Boolean', 'Se há o divisor da parte superior'],
                ['divisor2', 'Boolean', 'Se há o divisor da parte inferior'],
                ['botao1', 'String', 'Texto do botão 1'],
                ['color1', 'String', 'Cor do botão 1'],
                ['destino1', 'String', 'Destino ao clicar no botão 1'],
                ['onclick1', 'String', 'Ação ao fazer ao clicar no botão 1'],
                ['botao2', 'String', 'Texto do botão 2'],
                ['color2', 'String', 'Cor do botão 2'],
                ['destino2', 'String', 'Destino ao clicar no botão 2'],
                ['onclick2', 'String', 'Ação ao fazer ao clicar no botão 2'],
                ['botao3', 'String', 'Texto do botão 3'],
                ['color3', 'String', 'Cor do botão 3'],
                ['destino3', 'String', 'Destino ao clicar no botão 3'],
                ['onclick3', 'String', 'Ação ao fazer ao clicar no botão 3']
                ]}
                retorno='O elemento (div) em tela.'
            />

            <Funcao
                titulo='arrumaDatas(data)'
                descricao='Converte datas para o modelo brasileiro.'
                autor='Vinicius Domingues'
                autorLinkedin='https://www.linkedin.com/in/vinicius-domingues-fonseca/'
                autorGithub='https://github.com/vinicius-domingues'
                nometipodescricao={[
                ['data', 'Date', 'Data no modelo YYYY-MM-DD']
                ]}
                retorno='Data no modelo DD/MM/AAAA.'
            />
            </div>
        </div>


    </>)
}

export default Funcoes;
