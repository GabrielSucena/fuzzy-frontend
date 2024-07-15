import React, { useEffect, useState } from "react";
import "./colaboradores.css";
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";
import { Link, useLocation } from "react-router-dom";
import Mensagem from "../../../components/mensagem";
import Carregando from "../../../components/carregando";

function Colaboradores() {
    const [collaborators, setCollaborators] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()

    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/collaborators', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                setCollaborators(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, 300)
    }, [])

    return (
        <>
            <TituloPagina titulopagina="Colaboradores" botao1='Adicionar' color1='roxo' destino1='/adiciona-colaborador' />
            {message && <Mensagem type="success" msg={message} />}
            <div className="colaboradores">
                <div className="colaboradores-card">
                    <div className="grid-container">
                        {collaborators.length > 0 && collaborators.map((collaborator) => (
                            <div className='div-card' key={collaborator.id}>
                                <div className="colaborador-item">
                                    <div className="topo">
                                        <p className="nome-card">{collaborator.fullName}</p>
                                        <p className="registro-card"><b>RG: </b>-registro na empresa-</p>
                                    </div>
                                    <div className="fundo">
                                        <p className="setor-card">-posicao- no setor {collaborator.collaboratorDepartment.name}</p>
                                    </div>
                                    <div> Editar </div>
                                    <div> Remover </div>
                                </div>
                            </div>
                        ))}
                        {!removeLoading && <Carregando className="div-carregar"/>}
                        {removeLoading && collaborators.length === 0 && (<p> Não há colaboradores</p>)}
                    </div>
                </div>   
            </div>
            <Rodape />
        </>
    );
}

export default Colaboradores;
