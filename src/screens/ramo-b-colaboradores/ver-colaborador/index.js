import { faBan, faCircleExclamation, faEye, faCopy, faPencil, faPrint, faQuestion, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link, useNavigate, useParams } from 'react-router-dom';
import vazioImg from "../../../../src/empty.svg"; // Importação da imagem
import Botao from "../../../components/botao";
import Carregando from "../../../components/carregando";
import TituloPagina from "../../../components/titulopagina";
import { v4 as uuidv4 } from 'uuid';
import "./ver-colaborador.css";
import semTreinamento from '../../semTreinamento.svg';
import Modal from '../../../components/modal';

function VerColaborador() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [collaborator, setCollaborator] = useState(null);
    const [trainings, setTrainings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTrainings, setFilteredTrainings] = useState([]);
    const [collaboratorMessage, setCollaboratorMessage] = useState('');
    const [selectedCriticality, setSelectedCriticality] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    const [popupMessage, setPopupMessage] = useState('');

    const verde = getComputedStyle(document.documentElement).getPropertyValue('--verde').trim();
    const vermelho = getComputedStyle(document.documentElement).getPropertyValue('--vermelho').trim();
    const laranja = getComputedStyle(document.documentElement).getPropertyValue('--laranja').trim();
    const vermelhoEscuro = getComputedStyle(document.documentElement).getPropertyValue('--vermelho-escuro').trim();
    const rosa = getComputedStyle(document.documentElement).getPropertyValue('--rosa').trim();
    const azul = getComputedStyle(document.documentElement).getPropertyValue('--azul').trim();
    const cinza = getComputedStyle(document.documentElement).getPropertyValue('--cinza-escuro').trim();
    const branco = getComputedStyle(document.documentElement).getPropertyValue('--branco').trim();
    const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
    const amarelo = getComputedStyle(document.documentElement).getPropertyValue('--amarelo').trim();
    const token = localStorage.getItem('authToken');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }


    useEffect(() => {
        fetch(`http://localhost:8080/colaboradores/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setCollaborator({
                    ...data,
                    courses: data.courses.map(course => ({
                        ...course,
                        start_date: formatDate(course.start_date) // Formata a data aqui
                    }))
                });
                setTrainings(data.courses);
            })
            .catch(err => console.log(err));
    }, [id]);



    useEffect(() => {
        const filtered = trainings
            .filter(course =>
                course.course_title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(course =>
                selectedCriticality ? course.classification === selectedCriticality : true
            )
            .filter(course =>
                selectedStatus ? course.status === selectedStatus : true
            );
        setFilteredTrainings(filtered);
    }, [searchTerm, selectedCriticality, selectedStatus, trainings]);



    if (!collaborator) {
        return <Carregando />;
    }

    function preExclusao(){
        setModalOpen(true);
    }
    
    function handleRemove(justificativa) {
        // Defina a URL correta, usando a variável id que você tem disponível
        const url = `http://localhost:8080/colaboradores/${id}`;
        const motivo = JSON.stringify({reason: justificativa})
        console.log("Exclusão sendo enviada: ", motivo, "para: ", url)

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'},
            body: JSON.stringify(motivo)
        })
        .then(response => {
            if (!response.ok) {
                // Se a resposta não for bem-sucedida, lance um erro
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json(); // ou response.text() dependendo do que a API retorna
        })
        .then(data => {
            // Aqui você pode manipular a resposta se necessário
            console.log('Colaborador removido com sucesso:', data);
        })
        .catch(err => {
            // Manipulação de erro
            const errorMessage = err.message.includes('500')
                ? 'Para que o(a) colaborador(a) ser excluido(a), por integridade, este não pode estar em nenhum curso.'
                : `Erro ao remover colaborador: ${err.message}`;
    
            setCollaboratorMessage(errorMessage);
    
            // Limpa a mensagem de erro após 2 segundos
            setTimeout(() => {
                setCollaboratorMessage('');
            }, 2000);
        });
    }
    
    



    const statusGrafico = {
        chart: { type: 'donut' },
        plotOptions: { pie: { donut: { size: '75%' } } },
        series: [
            collaborator?.describeCollaborator?.green,
            collaborator?.describeCollaborator?.yellow,
            collaborator?.describeCollaborator?.orange,
            collaborator?.describeCollaborator?.red],
        labels: ['Feito', '16 até 30 dias', '0 até 15 dias', 'Mais de 30 dias'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: { horizontal: 0, vertical: 10 },
        },
        colors:
            [
                verde,
                vermelho,
                laranja,
                vermelhoEscuro,
            ],
    };

    const codificacoesVazio = {
        chart: { type: 'donut' },
        plotOptions: { pie: { donut: { size: '75%' } } },
        series: [100],
        labels: ['Cursos que não entraram no período de vigência'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: { horizontal: 0, vertical: 10 },
        },
        colors:
            [
                cinza
            ],
    };

    const codificacoesGrafico = {
        chart: { type: 'donut' },
        plotOptions: { pie: { donut: { size: '75%' } } },
        series: [collaborator?.describeCollaborator?.sop, collaborator?.describeCollaborator?.gop],
        labels: ['CAD-QU-SOP', 'CAD-QU-GOP'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: { horizontal: 0, vertical: 10 },
        },
        colors:
            [
                azul,
                rosa,

            ],
    };

    const totalStatus = (
        (collaborator?.describeCollaborator?.green || 0) +
        (collaborator?.describeCollaborator?.yellow || 0) +
        (collaborator?.describeCollaborator?.orange || 0) +
        (collaborator?.describeCollaborator?.red || 0));

    const totalTypes = (
        (collaborator?.describeCollaborator?.sop || 0) +
        (collaborator?.describeCollaborator?.gop || 0));

        const handleCopy = (text) => {
            navigator.clipboard.writeText(text);
        };

        function normalizeText(text) {
            // Converte o texto para minúsculas
            const lowerCaseText = text.toLowerCase();
            
            // Remove acentos usando uma expressão regular
            const noAccentsText = lowerCaseText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            
            // Remove espaços
            const normalizedText = noAccentsText.replace(/\s+/g, '');
            
            return normalizedText;
        }

        const handleClose = (e) => {
            e.preventDefault();
            setModalOpen(false);
          };

          const handlePrint = (parte) => {
            const originalContent = document.body.innerHTML;
        
            let printContent = ''; // Declara a variável printContent fora do bloco condicional
        
            if (parte === 'cima') {
                printContent = document.querySelector('.metricas').innerHTML;
            } else {
                printContent = document.querySelector('.grid-container').innerHTML;
            }
        
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload(); // Recarregar a página e restaurar o conteúdo original
        };
        

    return (
        <>
              <Modal 
                    isOpen={modalOpen} 
                    onClose={handleClose} 
                    onConfirm={handleRemove} 
                    reason={true} 
                    complement={"Este colaborador(a) será excluído(a) da lista de colaboradores."} 
                    actions={true} 
                    buttons={true} 
                    text="Excluir colaborador(a)?" 
            />
            {collaboratorMessage && <div className="message">{collaboratorMessage}</div>}
            <div className="topo-telas">
                <div className="titulo-e-descricao">
                    <p className="titulo-pagina" onClick={() => handleCopy(collaborator.name)}>{collaborator.name || "Nome do Colaborador"}&nbsp;&nbsp;<FontAwesomeIcon className="icon-copy" icon={faCopy} color={'#7B50A6'} /></p>
                    <p className="descricao-titulo" onClick={() => handleCopy(collaborator.register)}>Sanofi ID: {`${collaborator.register || ""}`}&nbsp;&nbsp;<FontAwesomeIcon className="icon-copy" icon={faCopy} color={cinza} /></p>
                </div>
                <div className="conteiner-botao">
                    <div className="botoes-titulo-pagina">
                        <Botao destino={`/editar-colaborador/${id}`} color={"roxo"}>
                            <FontAwesomeIcon className="icon" icon={faPencil} color={branco} /> <span>Editar</span>
                        </Botao>
                        <Botao onClick={preExclusao} color={"branco"}>
                            <FontAwesomeIcon className="icon" icon={faBan} color={roxo} /> <span>Obsoletar</span>
                        </Botao>
                        <Botao onClick={() => navigate(`/auditar-colaborador/${collaborator.id}?register=${collaborator.register}`)} color={"branco"}>
                            <FontAwesomeIcon className="icon" icon={faEye} color={roxo} /> <span>Auditar</span>
                        </Botao>
                        <Botao onClick={() => handlePrint('cima')} color={"branco"}>
                            <FontAwesomeIcon className="icon" icon={faPrint} color={roxo} /> <span>Extrair</span>
                        </Botao>

                    </div>
                </div>
                <hr className="divisorbaixo" />
            </div>

            <div className="metricas">
                <div className="bloco bloco1">
                    <div className="bloco1-1">
                        <p><b>Cargo:</b> {collaborator.position}</p>
                        <p className='email-colaborador'  onClick={() => handleCopy(collaborator.email)}><b>Email:</b> {collaborator.email}&nbsp;&nbsp;<FontAwesomeIcon className="icon-copy" icon={faCopy} color={cinza}/></p>
                        <p><b>Setor:</b> {collaborator.department}</p>
                    </div>
                </div>
                <div className="bloco bloco2">
                    <div className="bloco2-1">
                        <div className="info-bloco-2">
                            <p className="topico">Treinamentos realizados</p>
                            <p className="valor-topico">{collaborator?.describeCollaborator?.green}</p>
                        </div>
                        <img src="/icones/done.svg" alt="ícone realizados" />
                    </div>
                    <div className="bloco2-2">
                        <div className="info-bloco-2">
                            <p className="topico">Treinamentos em andamento</p>
                            <p className="valor-topico">{collaborator?.describeCollaborator?.orange + collaborator?.describeCollaborator?.yellow}</p>
                        </div>
                        <img src="/icones/doing.svg" alt="ícone em andamento" />
                    </div>
                    <div className="bloco2-3">
                        <div className="info-bloco-2">
                            <p className="topico">Treinamentos pendentes</p>
                            <p className="valor-topico">{collaborator?.describeCollaborator?.red}</p>
                        </div>
                        <img src="/icones/do.svg" alt="ícone a fazer" />
                    </div>
                </div>
                <div className="bloco bloco3">
                    {totalTypes > 0 ? (
                        <>
                            <div className="grafico1">
                                {totalStatus > 0 ? (
                                    <>
                                        <ReactApexChart
                                            options={statusGrafico}
                                            series={statusGrafico.series}
                                            type="donut"
                                            height={200}
                                        />
                                        <div className="legendas-conteiner">
                                            <div className="legendas">
                                                <p className="legenda" style={{ color: verde }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faSquare} color={verde} /> {`Curso realizado`.toUpperCase()}
                                                </p>
                                                <p className="legenda" style={{ color: vermelho }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faSquare} color={vermelho} /> {`em andamento (Quizena 1)`.toUpperCase()}
                                                </p>
                                                <p className="legenda" style={{ color: laranja }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faSquare} color={laranja} /> {`em andamento (Quizena 2)`.toUpperCase()}
                                                </p>
                                                <p className="legenda" style={{ color: vermelhoEscuro }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faSquare} color={vermelhoEscuro} /> {`Curso não realizado`.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ReactApexChart
                                            options={codificacoesVazio}
                                            series={codificacoesVazio.series}
                                            type="donut"
                                            height={200}
                                        />
                                        <div className="legendas-conteiner">
                                            <div className="legendas">
                                                <p className="legenda" style={{ color: cinza }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faQuestion} color={cinza} /> {`Cursos não vigentes`.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="grafico2">
                                {totalTypes > 0 ? (
                                    <>
                                        <ReactApexChart
                                            options={codificacoesGrafico}
                                            series={codificacoesGrafico.series}
                                            type="donut"
                                            height={200}
                                        />
                                        <div className="legendas-conteiner">
                                            <div className="legendas">
                                                <p className="legenda" style={{ color: azul }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faSquare} color={azul} /> {`Codificação SOP`.toUpperCase()}
                                                </p>
                                                <p className="legenda" style={{ color: rosa }}>
                                                    <FontAwesomeIcon className="quadrado-legenda" icon={faSquare} color={rosa} /> {`Codificação GOP`.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="grafico2">
                                        <img src={vazioImg} alt="Imagem vazia" />
                                        <p>Não há dados</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="info-grafico-vazio">
                            <p className="destaque-grafico">Oops...</p>
                            <img src={vazioImg} alt="Imagem vazia" className="empty" />
                            <p className="empty-direita-um">Quando este <span className="destaque-dois">colaborador</span> for inserido em algum <span className="destaque-tres">treinamento,</span> os gráficos aparecerão aqui!</p>
                        </div>

                    )}
                </div>
            </div>
            <TituloPagina
                titulopagina="Treinamentos atrelados"
                divisor1={true}
            />
                <div className="conteiner-botao-dois">
                    <div className="botoes-titulo-pagina">
                        <Botao onClick={() => {}} color={"roxo"}>
                            <FontAwesomeIcon className="icon" icon={faEye} color={branco} /> <span>Notificar</span>
                        </Botao>
                        <Botao onClick={() => handlePrint('baixo')} color={"branco"}>
                            <FontAwesomeIcon className="icon" icon={faPrint} color={roxo} /> <span>Extrair</span>
                        </Botao>

                    </div>
                </div>
        <div className="treinamentos">
            <div className="treinamentos-card">
                <div className="busca-filtros-treinamento">
                    <input
                        type="text"
                        className="campo-busca"
                        placeholder="Pesquise AQUI o treinamento pelo nome"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="filtro"
                        onChange={e => setSelectedCriticality(e.target.value)}
                        value={selectedCriticality}
                    >
                        <option value="">Classificação</option>
                        <option value="ME">De menor</option>
                        <option value="MA">De maior</option>
                        <option value="C">Crítico</option>
                        <option value="N/A">Não aplicável</option>
                    </select>
                    <select
                        className="filtro"
                        onChange={e => setSelectedStatus(e.target.value)}
                        value={selectedStatus}
                    >
                        <option value="">Conclusão</option>
                        <option value="Realizado">Realizado</option>
                        <option value="À realizar">À realizar</option>
                    </select>
                </div>
                <div className="grid-container">
                    {filteredTrainings.length > 0 ? (
                        filteredTrainings.map((course) => (
                            <Link className='retirar-estilo' to={`/treinamentos/${course.id}`} key={course.id}>
                                <div className='div-card'>
                                    <div className={"treinamento-item"}>
                                        <div className="cima-info">
                                            <p className="nome-card">{course.course_title}</p>
                                            <p className="course_type">Versão {course.course_version}</p>
                                            <p className="course_type">
                                                {course.codification}
                                                &nbsp;&nbsp;
                                                <FontAwesomeIcon className="icon-copy" icon={faCopy} color="#6c757d" />
                                            </p>
                                        </div>
                                        <div className="meio-info">
                                            <p className="meio">
                                                <FontAwesomeIcon icon={faCircleExclamation} color={vermelhoEscuro}/>
                                                &nbsp;{course.classification}
                                            </p>
                                            <p className="meio">
                                                <FontAwesomeIcon icon={faStar} color={amarelo}/>
                                                &nbsp;{formatDate(course.start_date)}
                                            </p>
                                        </div>
                                        <div className="baixo-info">
                                            <p className={normalizeText(course.status)}>{course.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
<div className='sem-treinamentos' style={{display: 'flex'}}>
    <p className="mensagem-sem-treinamento">
        Ainda <span className="destaque-tres">não há treinamentos</span> para este colaborador ou <span className="destaque-dois">os filtros</span> não trouxeram resultados.
    </p>
    <img className='imagem-sem-treinamento' src={semTreinamento} alt='Imagem simbolizando a ausência de resultados de treinamentos pela busca ou conexão com a API'/>
</div>


                        
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default VerColaborador;