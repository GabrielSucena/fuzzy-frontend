import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./editar-colaborador.css";
import TituloPagina from "../../../components/titulopagina";
import Carregando from "../../../components/carregando";
import FormularioColaborador from "../../../components/formularioColaborador";
import Botao from "../../../components/botao";

function EditarColaborador() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collaborator, setCollaborator] = useState(null);
    const [message, setMessage] = useState('');

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

    if (!collaborator) {
        return <Carregando />;
    }

    function editPost(collaborator) {
        setMessage('');
        fetch(`http://localhost:5000/collaborators/${collaborator.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(collaborator)
        })
        .then(resp => resp.json())
        .then((data) => {
            setCollaborator(data);
            setMessage('Alterado com sucesso!');
            setTimeout(() => {
                setMessage('');
                navigate(`/ver-colaborador/${id}`);
            }, 1500); // Redireciona após 1.5 segundos
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            {message && (<div className="message">{message}</div>)}
            
            <TituloPagina
                titulopagina="Editar Colaborador"
                divisor2={true}
            />
            <FormularioColaborador
                handleSubmit={editPost}
                textoBotao="Salvar"
                collaboratorData={collaborator}
            />
        </>
    );
}

export default EditarColaborador;
