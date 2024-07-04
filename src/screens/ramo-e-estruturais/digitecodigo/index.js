import React, { useState } from 'react';
import './digitecodigo.css';
import Banner from '../../../components/banner';
import Botao from '../../../components/botao';
import { Link } from 'react-router-dom'
import InputCode from "../../../components/verificationcode";

export function DigiteCodigo() {
  const [loading, setLoading] = useState(false);


  return (
    <>
      <Banner />
      <section className="digite-codigo">
        <div className='campos-digite-codigo'>
          <p className='p-digite-o-codigo'>Insira o código de 4 números que foi enviado para o seu email</p>
          
          <h3>colaborador@sanofi.com</h3>
          
          <InputCode length={4} label="" loading={loading} onComplete={code => {setLoading(true); setTimeout(() => setLoading(false), 10000);}}/>
          
          <div className='botoes-digite-codigo'>
            <Botao>REENVIAR CÓDIGO</Botao>
            <Link to='/esqueci-a-senha'><Botao>TROCAR SENHA</Botao></Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default DigiteCodigo;
