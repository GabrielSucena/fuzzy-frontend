import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/screens/ramo-e-estruturais/home'
import Login from '../src/screens/ramo-e-estruturais/login'
import DigiteSeuEmail from './screens/ramo-e-estruturais/digiteseuemail'
import DigiteCodigo from './screens/ramo-e-estruturais/digitecodigo'
import Esqueciasenha from './screens/ramo-e-estruturais/esqueciasenha'
import Treinamentos from './screens/ramo-a-treinamentos/treinamentos'
import Colaboradores from './screens/ramo-b-colaboradores/colaboradores'
import Auditoria from './screens/ramo-d-auditorias/auditoria'
import Perfil from './screens/ramo-c-meu-perfil/perfil'
// Ajustado para não repetir o nome do componente duplicado: Dentro da pasta de cada componente cada js é chamado de index.

// Pode-se passar por parâmetro pois im cpmponente no fundo é uma função, que a função anonima recebera (label)
function App() {
 
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*'                 element={<h1>404. Página não encontrada</h1>} />
          <Route path='/digite-o-email'   element={<DigiteSeuEmail/>}/>
          <Route path='/esqueci-a-senha'  element={<Esqueciasenha/>}/>
          <Route path='/digite-o-codigo'  element={<DigiteCodigo/>}/>
          <Route path='/'                 element={<Login/>} />
          <Route path='/home'             element={<Home/>} />

          <Route path='/treinamentos'     element={<Treinamentos/>} />
          <Route path='/colaboradores'    element={<Colaboradores/>} />
          <Route path='/auditoria'        element={<Auditoria/>} />
          <Route path='/perfil'           element={<Perfil/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
