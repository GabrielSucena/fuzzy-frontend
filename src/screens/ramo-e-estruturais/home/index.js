import React, { useEffect, useState } from 'react';
import './home.css';
import Card from '../../../components/card';
import BoasVindas from '../../../components/boasvindas';
import { Link } from 'react-router-dom';

export function Home() {
  const token = localStorage.getItem('authToken');
  const [nome, setNome] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        setNome(data.name || 'usuário(a)');
    })
    .catch(err => console.log(err));
  }, [token]);


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
