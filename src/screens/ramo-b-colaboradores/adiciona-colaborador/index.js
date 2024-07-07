import React from "react";
import { SimpleGrid, Box as ChakraBox } from "@chakra-ui/react";
import Bannerhome from '../../../components/bannerhome';
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";
import "./adiciona-colaborador.css"; // Importe seu arquivo de estilos CSS aqui
import { TextField } from '@mui/material';

function CadastroColaborador() {
    function PostColaborador(e){
        e.preventDefault();
        console.log("Ativei!");
    }

    return (
        <>
            <Bannerhome />
            <TituloPagina titulopagina="Adicionar colaborador" />
            <div className="conteiner-cadastro">
                <ChakraBox className="quadrado-cadastro" maxW="30rem" mx="auto">
                    <SimpleGrid columns={2} spacingX='1rem' spacingY='20px'>
                        <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                        />
                        <TextField
                                required
                                id="outlined-requireds"
                                label="Required"
                                defaultValue="Hello World"
                        />
                    </SimpleGrid>
                </ChakraBox>
            </div>
            <Rodape />
        </>
    );
}

export default CadastroColaborador;
