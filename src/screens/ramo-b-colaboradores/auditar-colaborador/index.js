import React from "react";
import "./auditar-colaborador.css"
import TituloPagina from "../../../components/titulopagina";
import { useParams } from "react-router-dom";

function AuditarColaborador (){
    const { id } = useParams();
    return (
    <>
        <TituloPagina titulopagina="Auditoria do colaborador" divisor2={true}/>
        <div className="conteiner-auditoria">
            <div className="titulo-auditoria">
                Audite em relação aos cursos
            </div>
            <div className="auditorias">
                Registro ID posicionado: {id}
            </div>
        </div>
    </>
)
}

export default AuditarColaborador;