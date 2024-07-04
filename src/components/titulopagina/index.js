import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Botao from "../botao";
import "./titulopagina.css";

function TituloPagina({ titulopagina = '', descricaotitulo = '', botao = 'indefinido', tembotao = false }) {
    return (
        <>
            <div className="topo-telas">
                <p className="titulo-pagina">{titulopagina}</p>
                <p className="descricao-titulo">{descricaotitulo}</p>
                {tembotao && (
                    <Link to='/a'><Botao>{botao}</Botao></Link>
                )}
                <hr />
            </div>
        </>
    );
}

TituloPagina.propTypes = {
    titulopagina: PropTypes.string.isRequired,
    tembotao: PropTypes.bool,
    botao: PropTypes.string,
    descricaotitulo: PropTypes.string,
};

export default TituloPagina;
