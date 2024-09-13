import React, { useEffect, useState } from "react";
import "./colaboradores.css";
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Mensagem from "../../../components/mensagem";
import Carregando from "../../../components/carregando";
import vazioImg from "../../../../src/vazio.svg"; // Importação da imagem
import { faCopy, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Padding } from "@mui/icons-material";
import url from '../../../functionsCenter/urlController'

function Colaboradores() {
    const token = localStorage.getItem('authToken');
    const [collaborators, setCollaborators] = useState([]);
    const [filteredCollaborators, setFilteredCollaborators] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [collaboratorMessage, setCollaboratorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCriticality, setSelectedCriticality] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
        }

        fetch(`${url}/colaboradores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 

            }
        }).then(resp => resp.json())
        .then(data => {
            console.log(data);
            setCollaborators(data);
            setFilteredCollaborators(data);
            setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, [location.state]);

    useEffect(() => {
        filterCollaborators();
    }, [searchTerm, selectedCriticality, selectedStatus, selectedPosition, selectedDepartment, collaborators]);

    const filterCollaborators = () => {
        let filtered = collaborators;

        if (searchTerm) {
            filtered = filtered.filter(collaborator =>
                collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCriticality) {
            filtered = filtered.filter(collaborator =>
                collaborator.criticality === selectedCriticality
            );
        }

        if (selectedStatus) {
            filtered = filtered.filter(collaborator =>
                collaborator.status === selectedStatus
            );
        }

        if (selectedPosition) {
            filtered = filtered.filter(collaborator =>
                collaborator.position.toLowerCase().includes(selectedPosition.toLowerCase())
            );
        }

        if (selectedDepartment) {
            filtered = filtered.filter(collaborator =>
                collaborator.department.toLowerCase().includes(selectedDepartment.toLowerCase())
            );
        }

        setFilteredCollaborators(filtered);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setMessage('Texto copiado com sucesso!');
            navigate('/colaboradores')
        }).catch((err) => {
            console.error('Erro ao copiar o texto: ', err);
            navigate('/colaboradores')
        });
    };

    return (
        <>
            <TituloPagina titulopagina="Colaboradores" botao1='Adicionar' color1='roxo' destino1='/adiciona-colaborador' />
            {message && <Mensagem type="success" msg={message} />}
            {collaboratorMessage && <Mensagem type="success" msg={collaboratorMessage} />}
            <div className={"colaboradores"}>
                <div className={`colaboradores-card${!removeLoading ? ' loading' : ''}`}>
                    <div className="busca-filtros" style={{ paddingBottom: '1rem' }}>
                        <input
                            type="text"
                            className="campo-busca"
                            placeholder="Pesquise AQUI pelo nome do colaborador ou pelo ID"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                       <>BUSCAR</>
                    </div>
                    
                    <div className="grid-container">
                        {filteredCollaborators.length > 0 && filteredCollaborators.map((collaborator) => (
                            <Link className='retirar-estilo' to={`/ver-colaborador/${collaborator.id}`} key={collaborator.id}>
                                <div className='div-card'>
                                    <div className="colaborador-item">
                                        <div className="topo">
                                            <p className="nome-card">{collaborator.name}</p>
                                            <p className="registro-card" onClick={() => handleCopy(collaborator.register)} >
                                                <b>{collaborator.register}&nbsp;&nbsp;<FontAwesomeIcon className="icon-copy" icon={faCopy} /></b>
                                            </p>
                                        </div>
                                        <div className="fundo">
                                            <p className="setor-card"><b>Cargo:<br /></b>{collaborator.position}</p>
                                        </div>
                                        <div className="fundo">
                                            <p className="setor-card"><b>Departamento:<br /></b>{collaborator.department}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {!removeLoading && <div className="sem-conexao-colaborador"><Carregando className="div-carregar" /></div>}
                    {removeLoading && filteredCollaborators.length === 0 && (
                        <>
                            <p className="mensagem-vazio">Não há <span className="destaque">colaboradores</span> ainda ou não foram encontrados...</p>
                            <img src={vazioImg} alt="Imagem de vazio" className="imagem-vazio"/>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Colaboradores;
