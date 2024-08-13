import React from 'react';
import './home.css';
import Card from '../../../components/card';
import BoasVindas from '../../../components/boasvindas';
import { Link } from 'react-router-dom';

export function Home() {

  const nome = "Fernanda"

  return (
    <>
      <BoasVindas nome={nome} />
      <div className='home-content'>
        <Link to='/treinamentos' className='link-card'>
          <div>
            <Card tipo="Matriz de treinamentos" descricao="Verifique também as vigências, aproveitamento e classificações" />
          </div>
        </Link>
        <Link to='/colaboradores' className='link-card'>
          <div>
            <Card tipo="Lista de colaboradores" descricao="Veja os nomes, cargos e a participação em treinamentos" />
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
