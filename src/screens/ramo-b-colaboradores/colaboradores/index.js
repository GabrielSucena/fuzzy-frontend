import React from "react";
import "./colaboradores.css";
import Bannerhome from '../../../components/bannerhome';
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";

// botao1
// Botão 2
// 

function Colaboradores() {
    return (
        <>
            <Bannerhome />
            <TituloPagina
                titulopagina="Colaboradores"
                botao1='Adicionar' color1='roxo' destino1='/adiciona-colaborador'
            />
            <div className="colaboradores">
                <div className="colaboradores-card">
                    <i className="fa fa-spinner fa-pulse fa-5x"></i>
                </div>
            </div>
            <Rodape />
        </>
    );
}

export default Colaboradores;
