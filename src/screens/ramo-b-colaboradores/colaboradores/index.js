import React from "react";
import "./colaboradores.css";
import Bannerhome from '../../../components/bannerhome';
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";

function Colaboradores() {
    return (
        <>
            <Bannerhome />
            <TituloPagina titulopagina="Colaboradores" descricaotitulo="Adicione ou visualize os colaboradores" botao="Adicionar" tembotao={true} />
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
