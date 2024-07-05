import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Ramo A
import Treinamentos from './screens/ramo-a-treinamentos/treinamentos'

// Ramo B
import Colaboradores from './screens/ramo-b-colaboradores/colaboradores'
import CadastroColaborador from './screens/ramo-b-colaboradores/adiciona-colaborador'
import VerColaborador from './screens/ramo-b-colaboradores/ver-colaborador'
import AuditarColaborador from './screens/ramo-b-colaboradores/auditar-colaborador'

// Ramo C
import Perfil from './screens/ramo-c-meu-perfil/perfil'

// Ramo D
import Auditoria from './screens/ramo-d-auditorias/auditoria'

// Ramo E
import Esqueciasenha from './screens/ramo-e-estruturais/esqueciasenha'
import Home from '../src/screens/ramo-e-estruturais/home'
import Login from '../src/screens/ramo-e-estruturais/login'
import DigiteSeuEmail from './screens/ramo-e-estruturais/digiteseuemail'
import DigiteCodigo from './screens/ramo-e-estruturais/digitecodigo'
// Ajustado para não repetir o nome do componente duplicado: Dentro da pasta de cada componente cada js é chamado de index.

// Pode-se passar por parâmetro pois im cpmponente no fundo é uma função, que a função anonima recebera (label)
function App() {
 
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* Ramo A */}
          <Route path='/treinamentos'     element={<Treinamentos/>} />

          {/* Ramo B */}
          <Route path='/colaboradores'            element={<Colaboradores/>} />
          <Route path='/adiciona-colaborador'     element={<CadastroColaborador/>} />
          <Route path='/ver-colaborador'          element={<VerColaborador/>} />   
          <Route path='/auditar-colaborador'      element={<AuditarColaborador/>} />         

          {/* Ramo C */}
          <Route path='/perfil'           element={<Perfil/>} />

          {/* Ramo D */}
          <Route path='/auditoria'        element={<Auditoria/>} />

          {/* Ramo E */}
          <Route path='*'                 element={<h1>404. Página não encontrada</h1>} />
          <Route path='/digite-o-email'   element={<DigiteSeuEmail/>}/>
          <Route path='/esqueci-a-senha'  element={<Esqueciasenha/>}/>
          <Route path='/digite-o-codigo'  element={<DigiteCodigo/>}/>
          <Route path='/login'            element={<Login/>} />
          <Route path='/home'             element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
