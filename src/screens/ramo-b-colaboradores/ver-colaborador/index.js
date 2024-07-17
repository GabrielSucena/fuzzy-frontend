import React, { useState, useEffect } from "react";
import "./ver-colaborador.css";
import TituloPagina from "../../../components/titulopagina";
import { useParams } from 'react-router-dom'
import Carregando from "../../../components/carregando";
import Botao from "../../../components/botao";
import FormularioColaborador from "../../../components/formularioColaborador";

function VerColaborador() {
    const { id } = useParams();
    const [collaborator, setCollaborator] = useState([]);
    const [showCollaboratorForm, setShowCollaboratorForm] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/collaborators/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setCollaborator(data);
                console.log(data);
            })
            .catch(err => console.log(err));
        }, 250)
    }, [id]);

    // Conditional rendering until collaborator data is fetched
    if (!collaborator) {
        return <Carregando/>;
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
            setShowCollaboratorForm(false);
            setMessage('Alterado com sucesso!');
            setTimeout(() => {
                setMessage('');
            }, 1500); // Mensagem desaparece após 3 segundos
        })
        .catch(err => console.log(err));
    }

    function toggleProjectForm(){
        setShowCollaboratorForm(!showCollaboratorForm)
    }

    return (
        <>
            {message && (message)}
            <TituloPagina
                titulopagina={collaborator.fullName || "Nome do Colaborador"}
                descricaotitulo={`Registro: ${collaborator.id || ""}`}
                divisor2={true}
                botao1="Editar"
                color1="roxo"
                destino1={`/editar-colaborador/${id}`}
                botao2="Excluir"
                color2="branco"
                destino2="/colaboradores"
                botao3="Auditar"
                color3="branco"
                destino3="/auditar-colaborador"
            />
            <Botao aoClicar={toggleProjectForm}>
                {!showCollaboratorForm ? 'Editar' : 'Voltar'}
            </Botao>
            {!showCollaboratorForm ? (
                <>
                    <div className="dado">{collaborator.id}</div>
                    <div className="dado">{collaborator.fullName}</div>
                    <div className="dado">{collaborator.collaboratorDepartment?.name}</div>
                </>

            ) : (<div className="dado">
                <FormularioColaborador
                handleSubmit={editPost}
                textoBotao="Salvar"
                collaboratorData={collaborator}/>
            </div>)}
        </>
    );
}

export default VerColaborador;
