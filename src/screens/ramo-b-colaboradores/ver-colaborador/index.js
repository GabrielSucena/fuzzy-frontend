import React from "react";
import "./ver-colaborador.css";
import TituloPagina from "../../../components/titulopagina";

function VerColaborador() {
    return (
        <>
            <TituloPagina
                titulopagina="{{nome}}"
                descricaotitulo="Registro: {{id}}"
                divisor2={true}
                botao1="Editar"
                color1="roxo"
                destino1="/editar-colaborador"
                botao2="Excluir"
                color2="branco"
                destino2="/colaboradores"
                botao3="Auditar"
                color3="branco"
                destino3="/auditar-colaborador"/>

            <div className="metricas">
                <div className="bloco1">
                    <div className="bloco1-1">
                        <p>Cargo: ~~cargo</p>
                        <p>Email: ~~email</p>
                        <p>Setor: ~~setor</p>
                    </div>
                </div>
                <div className="bloco2">
                    <div className="bloco2-1">
                        <p>Treinamentos realizados</p>
                        <p>4</p>
                        <p>ícone</p>
                    </div>
                    <div className="bloco2-2">
                        <p>Treinamentos em andamento</p>
                        <p>4</p>
                        <p>ícone</p>
                    </div>
                    <div className="bloco2-3">
                        <p>Treinamentos pendentes</p>
                        <p>4</p>
                        <p>ícone</p>
                    </div>
                </div>
                <div className="bloco3">
                    <div className="grafico1">
                        <p>Gráfico 1</p>
                        <p>Legenda 1</p>
                        <p>Legenda 2</p>
                        <p>Legenda 3</p>
                        <p>Legenda 4</p>
                    </div>
                    <div className="grafico2">
                        <p>Gráfico 2</p>
                        <p>Legenda 1</p>
                        <p>Legenda 2</p>
                    </div>
                    
                </div>
            </div>

            <TituloPagina
                titulopagina="Treinamentos atrelados"
                divisor1={true}
                botao1="Notificar"
                color1="branco"
            />
            <div className="treinamentos-atrelados">
                Treinamentos atrelados
            </div>
        </>
    );
}

export default VerColaborador;
