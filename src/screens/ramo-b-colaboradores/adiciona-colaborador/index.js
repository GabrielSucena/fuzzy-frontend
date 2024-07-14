import { React } from "react";
import TituloPagina from "../../../components/titulopagina";
import "./adiciona-colaborador.css";
import FormularioColaborador from "../../../components/formularioColaborador";
import { useNavigate } from "react-router-dom";

function CadastroColaborador() {
    const navigate = useNavigate();

    function createPost(collaborator) {
        if (!collaborator.collaboratorDepartment) {
            collaborator.collaboratorDepartment = [];
        }

        fetch('http://localhost:5000/collaborators', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(collaborator),
        })
            .then((resp) => resp.json())
            .then(() => {
                navigate('/colaboradores', { state: { message: "Colaborador adicionado com sucesso!" } });
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <TituloPagina titulopagina="Adicionar colaborador" />
            <FormularioColaborador handleSubmit={createPost} textoBotao="Adicionar" textoBotao2="Cancelar" />
        </>
    );
}

export default CadastroColaborador;
