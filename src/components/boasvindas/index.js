// src/components/BoasVindas.js
import React from 'react';
import './boasvindas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCoffee } from '@fortawesome/free-solid-svg-icons';

/**
 * @function BoasVindas
 * @since 2024
 * @version 1
 * @param {String} nome - Nome do usuário logado
 * @returns {JSX.Element} O elemento (div) em tela com a saudação apropriada.
 * @description Modelo centralizado que dá as boas-vindas ao usuário com a saudação do período do dia vigente.
 * @author Vinicius Domingues
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */

function BoasVindas({ nome }) {
    const currentHour = new Date().getHours();  // Obtém a hora atual
    let cPeriodo;
    let cEmoji;
    const amarelo = getComputedStyle(document.documentElement).getPropertyValue('--amarelo').trim();

    if (currentHour >= 6 && currentHour < 12) {
        cPeriodo = "Bom dia, ";
        cEmoji = <FontAwesomeIcon icon={faSun} color={amarelo}/>;
    } else if (currentHour >= 12 && currentHour < 18) {
        cPeriodo = "Boa tarde, ";
        cEmoji = <FontAwesomeIcon icon={faCoffee} color={amarelo}/>;
    } else {
        cPeriodo = "Boa noite, ";
        cEmoji = <FontAwesomeIcon icon={faMoon} color={amarelo}/>;
    }

    return (
        <div className='boasvindas'>
            <p className='p-boas-vindas'>{cPeriodo} <b>{nome}!&nbsp;&nbsp;{cEmoji}</b></p>
            <p className='desc-boas-vindas'>Seja bem-vindo(a) de volta, cheque aqui suas principais tarefas</p>
        </div>
    );
}

export default BoasVindas;
