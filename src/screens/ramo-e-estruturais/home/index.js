import React from 'react';
import './home.css'
//import { Link } from 'react-router-dom';
import Card from '../../../components/card'

import Bannerhome from '../../../components/bannerhome'
import Rodape from '../../../components/rodape'
import BoasVindas from '../../../components/boasvindas'

export function Home() {
  return (
    <>
      <Bannerhome />
      <BoasVindas nome="Vinicius" />
      <div className='home-content'>
        <Card tipo="Matriz de treinamentos" descricao="Verifique também as vigências e classificações"/>
        <Card tipo="Lista de colaboradores" descricao="Veja os nomes e os cargos"/>
      </div>
      <Rodape />
    </>
  );
}

export default Home;
