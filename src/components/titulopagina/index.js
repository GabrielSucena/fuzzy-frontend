import React from "react";
import PropTypes from 'prop-types';
import Botao from "../botao";
import "./titulopagina.css";

function TituloPagina({
    titulopagina = 'Título Obrigatório',
    descricaotitulo = '',
    divisor1 = false,
    divisor2 = false,
    botao1 = '', color1 = 'roxo', destino1 = '/',
    botao2 = '', color2 = 'roxo', destino2 = '/',
    botao3 = '', color3 = 'roxo', destino3 = '/'
}) {
    return (
        <>
            <div className="topo-telas">
                {divisor1 && (<hr className="divisorcima" />)}
                <p className="titulo-pagina">{titulopagina}</p>
                {descricaotitulo !== '' && (<p className="descricao-titulo">{descricaotitulo}</p>)}
                {(botao1 !== '' || botao2 !== '' || botao3 !== '') && (
                    <div className="botoes-titulo-pagina">
                        {botao1 !== '' && (<Botao destino={destino1} color={color1}>{botao1}</Botao>)}
                        {botao2 !== '' && (<Botao destino={destino2} color={color2}>{botao2}</Botao>)}
                        {botao3 !== '' && (<Botao destino={destino3} color={color3}>{botao3}</Botao>)}
                    </div>
                )}
            </div>
            {divisor2 && (<hr className="divisorbaixo" />)}
        </>
    );
}

TituloPagina.propTypes = {
    titulopagina: PropTypes.string.isRequired
};

export default TituloPagina;
