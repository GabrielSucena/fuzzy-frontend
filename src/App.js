// Rotas
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Container from './components/container'

// Ramo A
import Layout from './gerenciador'; // Importe o novo Layout
import Treinamentos from "./screens/ramo-a-treinamentos/treinamentos";
import AdicionaTreinamento from "./screens/ramo-a-treinamentos/adiciona-treinamento";
import TreinamentoInfo from "./screens/ramo-a-treinamentos/treinamentoInfo";
import EditarTreinamento from "./screens/ramo-a-treinamentos/editar-treinamento"; 
// Ramo B
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
// Ajustado para não repetir o nome do componente duplicado: Dentro da pasta de cada componente cada js é chamado de index.

import Teste from "./screens/ramo-e-estruturais/teste";
import Bannerhome from "./components/bannerhome";
import Rodape from "./components/rodape";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: { primary: { main: "#6000B6" } },
});

// Pode-se passar por parâmetro pois im cpmponente no fundo é uma função, que a função anonima recebera (label)
import AdicionaTreinamento from "./screens/ramo-a-treinamentos/adiciona-treinamento";
import Teste2 from './screens/ramo-e-estruturais/teste2';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Bannerhome />
          <Container customClass="container">
            <Routes>
              {/* Ramo A */}
              <Route path="/treinamentos" element={<Treinamentos />} />
              <Route
                path="/adicionar-treinamentos"
                element={<AdicionaTreinamento />}
              />
              <Route
                path="/editar-treinamentos"
                element={<EditarTreinamento/>}
              />
              <Route path="/treinamentos/:id" element={<TreinamentoInfo />} />
              {/* Ramo B */}
              <Route path="/colaboradores" element={<Colaboradores />} />
              <Route
                path="/adiciona-colaborador"
                element={<CadastroColaborador />}
              />
              
              <Route path="/ver-colaborador" element={<VerColaborador />} />
              <Route
                path="/auditar-colaborador"
                element={<AuditarColaborador />}
              />

              {/* Ramo C */}
              <Route path="/perfil" element={<Perfil />} />

              {/* Ramo D */}
              <Route path="/auditoria" element={<Auditoria />} />

              {/* Ramo E */}
              <Route path="*" element={<h1>404. Página não encontrada</h1>} />
              <Route path="/digite-o-email" element={<DigiteSeuEmail />} />
              <Route path="/esqueci-a-senha" element={<Esqueciasenha />} />
              <Route path="/digite-o-codigo" element={<DigiteCodigo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />

              {/* Modais */}
              <Route path="/modal" element={<Modal />} />

              {/* Testes */}
              <Route path="/teste" element={<Teste />} />
            </Routes>
          </Container>

          {/* <Rodape /> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
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
