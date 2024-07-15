

import React, { useState } from 'react';
import CampoTexto from '../../../components/campotexto'
import Botao from '../../../components/botao'
import './digiteseuemail.css'
import { Link } from 'react-router-dom'

export function DigiteSeuEmail() {

    const [email, setEmail] = useState('teste@sanofi.com.br')
    
    return (
        <>
            <section className='digiteseuemail'>
                <div className='campos-email'>
                    <CampoTexto
                                    obrigatorio={true}
                                    label="Digite seu email:"
                                    placeholder="Digite sua email colaborativo aqui"
                                    valor={email}
                                    aoAlterado={valor=>setEmail(valor)}
                                />
                    <div className='botao-email-centralizar'>
                        <Botao color="roxo" destino="/digite-o-codigo">ENVIAR</Botao>
                    </div>

                </div>

            </section>
        </>

    );
}

export default DigiteSeuEmail