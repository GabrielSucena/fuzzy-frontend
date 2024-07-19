import React, { useState, useEffect } from "react";
import "./ver-colaborador.css";
import TituloPagina from "../../../components/titulopagina";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Carregando from "../../../components/carregando";
import Botao from "../../../components/botao";
import Teste2 from '../../ramo-e-estruturais/teste2';

function VerColaborador() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collaborator, setCollaborator] = useState(null);
    const [collaboratorMessage, setCollaboratorMessage] = useState('');
    const [collaboratorInfo, setCollaboratorInfo] = useState(null);
    const [green, setGreen] = useState(null);
    const [yellow, setYellow] = useState(null);
    const [orange, setOrange] = useState(null);
    const [red, setRed] = useState(null);
    const [code1, setCode1] = useState(null);
    const [code2, setCode2] = useState(null);
    const [andamento, setAndamento] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/collaborators/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setCollaborator(data);
        })
        .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        fetch('http://localhost:5000/collaboratorInfo/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(info => {
            const infoData = info[0]; // Assume que a informação vem como um array e pegamos o primeiro item
            
            setGreen(infoData.green);
            setYellow(infoData.yellow);
            setOrange(infoData.orange);
            setRed(infoData.red);
            setCode1(infoData.code1);
            
            const andamento = infoData.orange + infoData.yellow;
            const total = andamento + infoData.green + infoData.red;
            const code2 = total - infoData.code1;
            
            setAndamento(andamento);
            setTotal(total);
            setCode2(code2);

            console.log(andamento);
            console.log(total);
            console.log(infoData.code1, code2);
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
                'Content-type': 'application/json'
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

    const trainings = [
        {"treinamento": "olá"},
        {"treinamento": "bem-vindo"},
        {"treinamento": "até logo"}
    ];
    
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
            <div className="dado">{collaborator.collaboratorDepartment?.name}</div>
            <div className="metricas">
                <div className="bloco bloco1">
                    <div className="bloco1-1">
                        <p>Cargo: ~~cargo</p>
                        <p>Email: ~~email</p>
                        <p>Setor: ~~setor</p>
                    </div>
                </div>
                <div className="bloco bloco2">
                    <div className="bloco2-1">
                        <p className="topico">Treinamentos realizados</p>
                        <p className="valor-topico">{green}</p>
                        <img src="/icones/done.svg" alt="ícone realizados" />
                    </div>
                    <div className="bloco2-2">
                        <p className="topico">Treinamentos em andamento</p>
                        <p className="valor-topico">{andamento}</p>
                        <img src="/icones/doing.svg" alt="ícone em andamento" />
                    </div>
                    <div className="bloco2-3">
                        <p className="topico">Treinamentos pendentes</p>
                        <p className="valor-topico">{red}</p>
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
            
            <TituloPagina titulopagina="Treinamentos atrelados" divisor1={true} botao1="Notificar" color1="branco"/>
            <div className="treinamentos">
                <div className="treinamentos-card">
                    <div className="grid-container">
                        {trainings.length > 0 && trainings.map((training) => (
                            <Link className='retirar-estilo' to={`/ver-treinamento/${training.id}`} key={training.id}>
                                <div className='div-card'>
                                    <div className="treinamento-item">
                                        <div className="topo">
                                            <p className="nome-card">{training.treinamento}</p>
                                            <p className="registro-card"><b>RG: </b>{training.register}</p>
                                        </div>
                                        <div className="fundo">
                                            <p className="setor-card">Cargo: {training.position} - Departamento: {training.trainingDepartment?.name}</p>
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
