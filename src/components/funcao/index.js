import React from 'react';
import './funcao.css'; // Importando o arquivo CSS

const Funcao = ({ 
  titulo, 
  descricao, 
  autor, 
  autorLinkedin, 
  autorGithub, 
  nometipodescricao, 
  retorno 
}) => {
  return (
    <div className="funcao-container">
      <div className="funcao-title">
        {titulo}
      </div>
      
      <div className="funcao-description">
        <p className='descricao-funcoes'>{descricao}</p>
        <hr className='divider-audit'/>
        <ul>
          <li className='autor-funcoes'><b>Autor: </b>{autor}</li>
          <li style={{ color: 'var(--roxo)' }}>&bull;&nbsp;&nbsp;<a href={autorLinkedin} target="_blank" rel="noopener noreferrer">LinkedIn do autor</a></li>
          <li style={{ color: 'var(--roxo)' }}>&bull;&nbsp;&nbsp;<a href={autorGithub} target="_blank" rel="noopener noreferrer">GitHub do autor</a></li>
        </ul>
      </div>
      <hr className='divider-audit'/>
      <p className='funcoes-titulo'><b>Parâmetros:</b></p>
      <div className="funcao-table-container">
        <table className="funcao-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Significado</th>
            </tr>
          </thead>
          <tbody>
            {nometipodescricao.map(([name, type, description], index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className='divider-audit'/>
      <div className="funcao-return">
        <strong>Retorno:</strong> {retorno}
      </div>
    </div>
  );
};

export default Funcao;
