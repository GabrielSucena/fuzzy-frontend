import React, { useState, useEffect } from "react";
import "./ver-colaborador.css";
import TituloPagina from "../../../components/titulopagina";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Carregando from "../../../components/carregando";
import Botao from "../../../components/botao";
import Teste2 from '../../ramo-e-estruturais/teste2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCodeCompare, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';

function VerColaborador() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collaborator, setCollaborator] = useState(null);
    const [trainings, setTrainings] = useState([]);
    const [collaboratorMessage, setCollaboratorMessage] = useState('');
    const [collaboratorInfo, setCollaboratorInfo] = useState(null);
    const [green, setGreen] = useState(0);
    const [yellow, setYellow] = useState(0);
    const [orange, setOrange] = useState(0);
    const [red, setRed] = useState(0);
    const [code1, setCode1] = useState(0);
    const [code2, setCode2] = useState(0);
    const [andamento, setAndamento] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/collaborators/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => setCollaborator(data))
        .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/trainings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/collaboratorInfo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(info => {
            const infoData = info[0];
            setGreen(infoData.green || 0);
            setYellow(infoData.yellow || 0);
            setOrange(infoData.orange || 0);
            setRed(infoData.red || 0);
            setCode1(infoData.code1 || 0);

            const andamento = (infoData.orange || 0) + (infoData.yellow || 0);
            const total = andamento + (infoData.green || 0) + (infoData.red || 0);
            const code2 = total - (infoData.code1 || 0);

            setAndamento(andamento);
            setTotal(total);
            setCode2(code2);
        })
        .catch(err => console.log(err));
    }, []);

    if (!collaborator) {
        return <Carregando />;
    }

    function handleRemove() {
        fetch(`http://localhost:5000/collaborators/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => {
            if (resp.ok) {
                navigate('/colaboradores', { state: { message: 'Colaborador removido com sucesso!' } });
            } else {
                return resp.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .catch(err => {
            setCollaboratorMessage(`Erro ao remover colaborador: ${err.message}`);
            console.log(err);
        });
    }

    return (
        <>
            {collaboratorMessage && <div className="message">{collaboratorMessage}</div>}
            <div className="topo-telas">
                <div className="titulo-e-descricao">
                    <p className="titulo-pagina">{collaborator.fullName || "Nome do Colaborador"}</p>
                    <p className="descricao-titulo">{`Registro: ${collaborator.id || ""}`}</p>
                </div>
                <div className="conteiner-botao">
                    <div className="botoes-titulo-pagina">
                        <Botao destino={`/editar-colaborador/${id}`} color={"roxo"}>Editar</Botao>
                        <Botao aoClicar={handleRemove} color={"branco"}>Excluir</Botao>
                        <Botao aoClicar={() => navigate(`/auditar-colaborador/${id}`)} color={"branco"}>Auditar</Botao>
                    </div>
                </div>
                <hr className="divisorbaixo" />
            </div>
            <div className="metricas">
                <div className="bloco bloco1">
                    <div className="bloco1-1">
                        <p><b>Cargo:</b> ~~cargo</p>
                        <p><b>Email:</b> ~~email</p>
                        <p><b>Setor:</b> {collaborator.collaboratorDepartment?.name}</p>
                    </div>
                </div>
                <div className="bloco bloco2">
                    <div className="bloco2-1">
                        <div className="info-bloco-2">
                            <p className="topico">Treinamentos realizados</p>
                            <p className="valor-topico">{green}</p>   
                        </div>
                        <img src="/icones/done.svg" alt="ícone realizados" />
                    </div>
                    <div className="bloco2-2">
                        <div className="info-bloco-2">
                            <p className="topico">Treinamentos andamento</p>
                            <p className="valor-topico">{andamento}</p>
                        </div>
                        <img src="/icones/doing.svg" alt="ícone em andamento" />
                    </div>
                    <div className="bloco2-3">
                        <div className="info-bloco-2">
                            <p className="topico">Treinamentos pendentes</p>
                            <p className="valor-topico">{red}</p>
                        </div>
                        <img src="/icones/do.svg" alt="ícone a fazer" />
                    </div>
                </div>
                <div className="bloco bloco3">
                    <div className="grafico1">
                        <p>Gráfico 1</p>
                        <p>Legenda 1</p>
                        <p>Legenda 2</p>
                        <p>Legenda 3</p>
                        <p>Legenda 4</p>
                    </div>
                    <div className="grafico2">
                        <p>Gráfico 2</p>
                        <p>Legenda 1</p>
                        <p>Legenda 2</p>
                    </div>
                </div>
            </div>
            <TituloPagina titulopagina="Treinamentos atrelados" divisor1={true} botao1="Notificar" color1="roxo"/>
            <div className="treinamentos">
                <div className="treinamentos-card">
                    <div className="busca-filtros">
                        <input type="text" className="campo-busca" placeholder="Pesquise aqui o treinamento" />
                        <select className="filtro">
                            <option value="">Classificação</option>
                            <option value="opcao1">Tipo 1</option>
                            <option value="opcao2">Tipo 2</option>
                        </select>
                        <select className="filtro">
                            <option value="">Status</option>
                            <option value="opcao1">Realizado</option>
                            <option value="opcao2">À realizar</option>
                        </select>
                    </div>
                    <div className="grid-container">
                        {trainings.length > 0 && trainings.map((training) => (
                            <Link className='retirar-estilo' to={`/ver-treinamento/${training.id_course}`} key={training.id_course}>
                                <div className='div-card'>
                                    <div className="treinamento-item">
                                        <div className="cima-info">
                                            <p className="nome-card">{training.name_course}</p>
                                            <p className="course_type">{training.course_type}</p>                   
                                        </div>
                                        <div className="meio-info">
                                            <p className="meio"><FontAwesomeIcon icon={faCircleExclamation}/>{training.shortened_name_criticality}</p>
                                            <p className="meio"><FontAwesomeIcon icon={faCodeCompare} />{training.version}</p>
                                            <p className="meio"><FontAwesomeIcon icon={faCheckToSlot} />{training.completed_date}</p>
                                        </div>
                                        <div className="baixo-info">
                                            <p className="carga">{training.realization_status}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerColaborador;
