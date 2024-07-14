import React from "react";
import "./colaboradores.css";
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";
import { Link } from "react-router-dom";

function Colaboradores() {
    // GET colaboradores
    const colaboradoresList = [
        {
            id: 1,
            collaboratorRecord: "12345",
            fullName: "Gabriel Sobrenome",
            collaboratorDepartment: "PeD",
            collaboratorPosition: "Coordenador"
        },
        {
            id: 2,
            collaboratorRecord: "67890",
            fullName: "Fernanda Sobrenome",
            collaboratorDepartment: "Recursos Humanos",
            collaboratorPosition: "Gerente"
        },
        {
            id: 3,
            collaboratorRecord: "13579",
            fullName: "João Sobrenome",
            collaboratorDepartment: "Saúde",
            collaboratorPosition: "Analista II"
        }
    ];

    function RenderizaLista({ lista }) {
        return (
            <div className="grid-container">
                {lista.map((item) => (
                    <Link to='/ver-colaborador' className='link-card' key={item.id}>
                        <div className="colaborador-item">
                            <div className="topo">
                                <p className="nome-card">{item.fullName}</p>
                                <p className="registro-card"><b>RG: </b> {item.collaboratorRecord}</p>
                            </div>
                            <div className="fundo">
                                <p className="setor-card">{item.collaboratorPosition} no setor {item.collaboratorDepartment}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <>
            <TituloPagina titulopagina="Colaboradores" botao1='Adicionar' color1='roxo' destino1='/adiciona-colaborador' />
            <div className="colaboradores">
                <div className="colaboradores-card">
                    <RenderizaLista lista={colaboradoresList} />
                </div>
            </div>
            <Rodape />
        </>
    );
}

export default Colaboradores;
