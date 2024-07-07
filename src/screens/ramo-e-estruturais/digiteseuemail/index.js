
import Banner from '../../../components/banner';
import React, { useState } from 'react';
import CampoTexto from '../../../components/campotexto'
import Botao from '../../../components/botao'
import './digiteseuemail.css'
import { Link } from 'react-router-dom'
import Rodape from '../../../components/rodape';

export function DigiteSeuEmail() {

    const [email, setEmail] = useState('')

    return (
        <>
            <Banner/>
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
                        <Link to='/digite-o-codigo'><Botao>ENVIAR</Botao></Link>
                    </div>

                </div>

            </section>
            <Rodape />
        </>

    );
}

export default DigiteSeuEmail