import React, { useEffect, useState } from "react";
import "./colaboradores.css";
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";
import { Link, useLocation } from "react-router-dom";
import Mensagem from "../../../components/mensagem";
import Carregando from "../../../components/carregando";
import vazioImg from "../../../../src/vazio.svg"; // Importação da imagem

function Colaboradores() {
    const [collaborators, setCollaborators] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [collaboratorMessage, setCollaboratorMessage] = useState('')

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
        }

        fetch('http://localhost:5000/collaborators', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            console.log(data);
            setCollaborators(data);
            setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, [location.state]);

    return (
        <>
            <TituloPagina titulopagina="Colaboradores" botao1='Adicionar' color1='roxo' destino1='/adiciona-colaborador' />
            {message && <Mensagem type="success" msg={message} />}
            {collaboratorMessage && <Mensagem type="success" msg={collaboratorMessage} />}
            <div className="colaboradores">
                <div className="colaboradores-card">
                    <div className="grid-container">
                        {collaborators.length > 0 && collaborators.map((collaborator) => (
                            <Link className='retirar-estilo' to={`/ver-colaborador/${collaborator.id}`}>
                                <div className='div-card' key={collaborator.id}>
                                    <div className="colaborador-item">
                                        <div className="topo">
                                            <p className="nome-card">{collaborator.fullName}</p>
                                            <p className="registro-card"><b>RG: </b>{collaborator.collaboratorRecord}</p>
                                        </div>
                                        <div className="fundo">
                                            <p className="setor-card">Cargo: {collaborator.position} - Departamento: {collaborator.department}</p>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                    {!removeLoading && <Carregando className="div-carregar" />}
                    {removeLoading && collaborators.length === 0 && (
                        <>
                            <p className="mensagem-vazio">Não há <span className="destaque">colaboradores</span> ainda...</p>
                            <img src={vazioImg} alt="Imagem de vazio" className="imagem-vazio"/>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Colaboradores;
