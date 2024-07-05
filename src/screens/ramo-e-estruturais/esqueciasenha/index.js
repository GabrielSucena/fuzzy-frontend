import './esqueciasenha.css'
import React, { useState } from 'react';
import Banner from '../../../components/banner'
import CampoSenha from '../../../components/camposenha'
import { Link } from 'react-router-dom'
import Botao from '../../../components/botao'
import Rodape from '../../../components/rodape';

export function Esqueciasenha() {

  // Entradas e seus setters
  const [novasenha, setSenha] = useState('')
  const [confirmasenha, setConfirmaSenha] = useState('')

  return (
    <>
      <Banner/>
      <section className='esqueciasenha'>
        <div className='campos'>
          <CampoSenha
                        obrigatorio={true}
                        label="Nova senha:"
                        placeholder="Digite sua nova senha aqui"
                        valor={novasenha}
                        aoAlterado={valor=>setSenha(valor)}
                    />
          <CampoSenha
                        obrigatorio={true}
                        label="Confirme sua senha:"
                        placeholder="Digite novamente sua nova senha aqui"
                        valor={confirmasenha}
                        aoAlterado={valor=>setConfirmaSenha(valor)}
                    />
        </div>
        <Link to='/'><Botao>TROCAR</Botao></Link>
      </section>
      <Rodape />
    </>

  );
}

export default Esqueciasenha