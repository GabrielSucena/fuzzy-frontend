import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './components/container';
import Layout from './gerenciador'; // Importe o novo Layout
import Treinamentos from "./screens/ramo-a-treinamentos/treinamentos";
import Colaboradores from "./screens/ramo-b-colaboradores/colaboradores";
import CadastroColaborador from "./screens/ramo-b-colaboradores/adiciona-colaborador";
import VerColaborador from "./screens/ramo-b-colaboradores/ver-colaborador";
import AuditarColaborador from "./screens/ramo-b-colaboradores/auditar-colaborador";
import EditarColaborador from "./screens/ramo-b-colaboradores/editar-colaborador";
import Perfil from "./screens/ramo-c-meu-perfil/perfil";
import Auditoria from "./screens/ramo-d-auditorias/auditoria";
import Esqueciasenha from "./screens/ramo-e-estruturais/esqueciasenha";
import Home from "../src/screens/ramo-e-estruturais/home";
import Login from "../src/screens/ramo-e-estruturais/login";
import DigiteSeuEmail from "./screens/ramo-e-estruturais/digiteseuemail";
import DigiteCodigo from "./screens/ramo-e-estruturais/digitecodigo";
import NaoEncontrada from "./screens/ramo-e-estruturais/naoencontrada";
import Modal from "./components/modal";
import AdicionaTreinamento from "./screens/ramo-a-treinamentos/adiciona-treinamento";
import Teste from './screens/ramo-e-estruturais/teste';
import Teste2 from './screens/ramo-e-estruturais/teste2';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rotas para os banners específicos */}
          <Route element={<Layout />}>
            
            <Route path='*' element={<NaoEncontrada/>} />
            <Route path='/digite-o-email' element={<DigiteSeuEmail />} />
            <Route path='/esqueci-a-senha' element={<Esqueciasenha />} />
            <Route path='/digite-o-codigo' element={<DigiteCodigo />} />
            <Route path='/login' element={<Login />} />
          </Route>
          {/* Rotas para todo o resto */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/treinamentos' element={<Treinamentos />} />
            <Route path='/colaboradores' element={<Colaboradores />} />
            <Route path='/adiciona-colaborador' element={<CadastroColaborador />} />
            <Route path='/ver-colaborador/:id' element={<VerColaborador />} />
            <Route path='/auditar-colaborador/:id' element={<AuditarColaborador />} />
            <Route path='/editar-colaborador/:id' element={<EditarColaborador />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/auditoria' element={<Auditoria />} />
            <Route path='/modal' element={<Modal />} />
            <Route path='/teste' element={<Teste />} />
            <Route path='/teste2' element={<Teste2 />} />
            {/* Rotas adicionais */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
