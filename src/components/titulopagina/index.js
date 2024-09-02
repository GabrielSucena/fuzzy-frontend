import React from "react";
import PropTypes from 'prop-types';
import Botao from "../botao";
import "./titulopagina.css";

function TituloPagina({
    titulopagina = 'Título Obrigatório',
    descricaotitulo = '',
    divisor1 = false,
    divisor2 = false,
    botao1 = '', color1 = 'roxo', destino1 = '', onClick1 = null,
    botao2 = '', color2 = 'roxo', destino2 = '', onClick2 = null,
    botao3 = '', color3 = 'roxo', destino3 = '', onClick3 = null
}) {

      /**
 * @function TituloPagina
 * @since 2024
 * @version 3
 * @param {String} titulopagina - Título da página
 * @param {String} descricaotitulo - Descrição da página
 * @param {Boolean} divisor1 - Se há o divisor da parte superior
 * @param {Boolean} divisor2 - Se há o divisor da parte inferior
 * 
 * @param {String} botao1 - Texto do botão 1
 * @param {String} color1 - Cor do botão 1
 * @param {String} destino1 - Destino ao clicar no botão 1
 * @param {String} onclick1 - Ação ao fazer ao clicar no botão 1
 * 
 * @param {String} botao2 - Texto do botão 2
 * @param {String} color2 - Cor do botão 2
 * @param {String} destino2 - Destino ao clicar no botão 2
 * @param {String} onclick2 - Ação ao fazer ao clicar no botão 2
 * 
 * @param {String} botao3 - Texto do botão 3
 * @param {String} color3 - Cor do botão 3
 * @param {String} destino3 - Destino ao clicar no botão 3
 * @param {String} onclick3 - Ação ao fazer ao clicar no botão 3
 * @returns {} O elemento (div) em tela.
 * @description Título, descrição e botões padrão do topo das páginas.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */


    return (
        <>
            <div className="topo-telass">
                {divisor1 && (<hr className="divisorcimaa" />)}
                
                <div className="titulo-e-descricaoo">
                    <p className="titulo-paginaa">{titulopagina}</p>
                    {descricaotitulo && (<p className="descricao-tituloo">{descricaotitulo}</p>)}
                </div>
                
                <div className="conteiner-botaoo">
                    {(botao1 || botao2 || botao3) && (
                        <div className="botoes-titulo-paginaa">
                            {botao1 && (<Botao onClick={onClick1} destino={destino1} color={color1}>{botao1}</Botao>)}
                            {botao2 && (<Botao onClick={onClick2} destino={destino2} color={color2}>{botao2}</Botao>)}
                            {botao3 && (<Botao onClick={onClick3} destino={destino3} color={color3}>{botao3}</Botao>)}
                        </div>
                    )}
                </div>
                
                {divisor2 && (<hr className="divisorbaixoo" />)}
            </div>
        </>
    );
}

TituloPagina.propTypes = {
    titulopagina: PropTypes.string.isRequired
};

export default TituloPagina;
