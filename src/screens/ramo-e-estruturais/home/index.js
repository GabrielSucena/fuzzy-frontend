import React, { useEffect, useState } from 'react';
import './home.css';
import Card from '../../../components/card';
import BoasVindas from '../../../components/boasvindas';
import { Link } from 'react-router-dom';
import { useRole } from '../../../functionsCenter/RoleContext';
import url from '../../../functionsCenter/urlController'

export function Home() {
  const token = localStorage.getItem('authToken');
  const [nome, setNome] = useState('')
  const { role } = useRole();
  const [idUser, setIdUser] = useState('')

  useEffect(() => {
    fetch(`${url}/usuario`, {
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
        setIdUser(data.id);
    })
    .catch(err => console.log(err));
  }, [token]);


  return (
    <>
      <BoasVindas nome={nome} />
      <div className='home-content'>
        {role !== '[basic]' &&
          <Link to='/treinamentos' className='link-card'>
            <div className='card-homer'>
              <Card
                tipo="Matriz de treinamentos"
                descricao="Verifique também as vigências, aproveitamento e classificações"
              />
            </div>
          </Link>
        }
        {role === '[admin]' || role === '[manager]' ?
          <Link to='/colaboradores' className='link-card'>
            <div className='card-homer'>
              <Card
                  tipo="Lista de colaboradores"
                  descricao="Veja os nomes, cargos e a participação em treinamentos"
                />
            </div>
          </Link>
        :
        <Link to={`/ver-colaborador/${idUser}`} className='link-card'>
          <div>
            <Card
              tipo="Central"
              descricao="Veja seus resultados e cursos"
            />
          </div>
        </Link>}
      </div>
    </>
  );
}

export default Home;
