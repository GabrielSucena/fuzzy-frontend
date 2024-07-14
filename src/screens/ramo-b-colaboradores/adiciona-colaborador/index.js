import  {React , useHistory } from "react";
//import { SimpleGrid } from "@chakra-ui/react";
import TituloPagina from "../../../components/titulopagina";
//import { FormControl, TextField, InputLabel, MenuItem, Select } from '@mui/material';
//import Botao from "../../../components/botao";
import "./adiciona-colaborador.css";
import FormularioColaborador from "../../../components/formularioColaborador";
import { useNavigate } from "react-router-dom";

function CadastroColaborador() {

    const navigate = useNavigate()

    function createPost(colaborador){
        
        fetch('http://localhost:5000/colaboradores', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(colaborador),
        })
            .then((resp) => resp.json()
            .then((data) => {
                console.log(data)
            })
        .catch((err) => console.log(err)))
        }

    return (
        <>
            <TituloPagina titulopagina="Adicionar colaborador" />
            <FormularioColaborador handleSubmit={createPost} textoBotao="Adicionar" textoBotao2="Cancelar" />
        </>
    );
}

export default CadastroColaborador;
