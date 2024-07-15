import './esqueciasenha.css'
import React, { useState } from 'react';
import CampoSenha from '../../../components/camposenha'
import { Link } from 'react-router-dom'
import Botao from '../../../components/botao'

export function Esqueciasenha() {

  // Entradas e seus setters
  const [novasenha, setSenha] = useState('')
  const [confirmasenha, setConfirmaSenha] = useState('')

  return (
    <>
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
        <Botao color="roxo" destino="/">TROCAR</Botao>
      </section>
    </>

  );
}

export default Esqueciasenha