// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material";
import PrivateRoute from "./screens/ramo-e-estruturais/protetor/privateRoute";
import Layout from './gerenciador';
import { RoleProvider } from '../src/functionsCenter/RoleContext';

// Importações dos componentes
import Treinamentos from "./screens/ramo-a-treinamentos/treinamentos";
import AdicionaTreinamento from "./screens/ramo-a-treinamentos/adiciona-treinamento";
import TreinamentoInfo from "./screens/ramo-a-treinamentos/treinamentoInfo";
import EditarTreinamento from "./screens/ramo-a-treinamentos/editar-treinamento";
import PdfSender from "./screens/ramo-a-treinamentos/pdfsender";
import AuditarTreinamento from './screens/ramo-a-treinamentos/AuditarTreinamento/index';
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
import Teste from "./screens/ramo-e-estruturais/teste";
import Teste2 from './screens/ramo-e-estruturais/teste2';
import Documentacoes from './screens/ramo-c-meu-perfil/documentacoes/documentacoes';
import Configuracoes from './screens/ramo-c-meu-perfil/configuracoes';
import Tutorial from './screens/ramo-c-meu-perfil/tutorial';
import Duvidas from './screens/ramo-c-meu-perfil/duvidas';
import Novidades from './screens/ramo-c-meu-perfil/novidades';

const theme = createTheme({
  palette: { primary: { main: "#6000B6" } },
});



function App() {
  return (
    <RoleProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path='/*' element={<NaoEncontrada />} />
                <Route path='/digite-o-email' element={<DigiteSeuEmail />} />
                <Route path='/esqueci-a-senha' element={<Esqueciasenha />} />
                <Route path='/digite-o-codigo' element={<DigiteCodigo />} />
                <Route path='/login' element={<Login />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/" element={<PrivateRoute element={Home} />} />
                <Route path="/treinamentos" element={<PrivateRoute element={Treinamentos} />} />
                <Route path="/adicionar-treinamentos" element={<PrivateRoute element={AdicionaTreinamento} />} />
                <Route path="/editar-treinamentos" element={<PrivateRoute element={EditarTreinamento} />} />
                <Route path="/treinamentos/:id" element={<PrivateRoute element={TreinamentoInfo} />} />
                <Route path="/pdfsender" element={<PrivateRoute element={PdfSender} />} />
                <Route path="/auditar-treinamento/:id" element={<PrivateRoute element={AuditarTreinamento} />} />

                <Route path="/colaboradores" element={<PrivateRoute element={Colaboradores} />} />
                <Route path="/adiciona-colaborador" element={<PrivateRoute element={CadastroColaborador} />} />
                <Route path="/ver-colaborador/:id" element={<PrivateRoute element={VerColaborador} />} />
                <Route path="/auditar-colaborador/:id" element={<PrivateRoute element={AuditarColaborador} />} />
                <Route path="/editar-colaborador/:id" element={<PrivateRoute element={EditarColaborador} />} />

                <Route path="/perfil" element={<PrivateRoute element={Perfil} />} />
                <Route path="/documentacoes" element={<PrivateRoute element={Documentacoes} />} />
                <Route path="/configuracoes" element={<PrivateRoute element={Configuracoes} />} />
                <Route path="/tutorial" element={<PrivateRoute element={Tutorial} />} />
                <Route path="/duvidas" element={<PrivateRoute element={Duvidas} />} />
                <Route path="/novidades" element={<PrivateRoute element={Novidades} />} />

                <Route path="/auditoria" element={<PrivateRoute element={Auditoria} />} />

                <Route path="/modal" element={<PrivateRoute element={Modal} />} />
                <Route path="/teste" element={<PrivateRoute element={Teste} />} />
                <Route path="/teste2" element={<PrivateRoute element={Teste2} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </RoleProvider>
  );
}

export default App;
