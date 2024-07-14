import React from 'react';
import './botao.css';

const Botao = ({ color, children, destino, text }) => {
    return (
        <>
            {color === 'roxo' ? (
                destino !== '' ? (
                    <a href={destino} className='link-botao'>
                        <button className='botao-roxo'>
                            {text}
                        </button>
                    </a>
                ) : (
                    <button className='botao-roxo'>
                        {text}
                    </button>
                )
            ) : (
                destino !== '' ? (
                    <a href={destino} className='link-botao'>
                        <button className='botao-branco'>
                            {text}
                        </button>
                    </a>
                ) : (
                    <button className='botao-branco'>
                        {text}
                    </button>
                )
            )}
        </>
    );
}

export default Botao;
