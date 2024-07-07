import React from 'react';
import './botao.css';

const Botao = ({ color, children, destino }) => {
    return (
        <>
            {color === 'roxo' ? (
                destino !== '' ? (
                    <a href={destino} className='link-botao'>
                        <button className='botao-roxo'>
                            {children}
                        </button>
                    </a>
                ) : (
                    <button className='botao-roxo'>
                        {children}
                    </button>
                )
            ) : (
                destino !== '' ? (
                    <a href={destino} className='link-botao'>
                        <button className='botao-branco'>
                            {children}
                        </button>
                    </a>
                ) : (
                    <button className='botao-branco'>
                        {children}
                    </button>
                )
            )}
        </>
    );
}

export default Botao;
