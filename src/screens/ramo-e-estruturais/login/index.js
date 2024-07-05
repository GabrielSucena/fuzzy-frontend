import { useState } from 'react';
import Banner from '../../../components/banner';
import Formulario from '../../../components/formulario';
import Rodape from '../../../components/rodape';
import "./login.css";

// Ajustado para não repetir o nome do componente duplicado: Dentro da pasta de cada componente cada js é chamado de index.

// Pode-se passar por parâmetro pois im cpmponente no fundo é uma função, que a função anonima recebera (label)
function Login() {
  // JSX
  const [colaboradores, setColaboradores] = useState([])
  
  const aoNovoColaboradorAdicionado = (colaborador) =>{
    console.log(colaborador)
    setColaboradores([...colaboradores, colaborador])
  }

  return (
    <>
      <div className="login">
        <Banner />
        <Formulario aoColaboradorCadastrado={colaborador => aoNovoColaboradorAdicionado(colaborador)}/>
      </div>
      <Rodape />
    </>
  );
}

export default Login;
