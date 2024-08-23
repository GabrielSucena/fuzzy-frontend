// Rotas
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from './components/container'
import Teste2 from './screens/ramo-e-estruturais/teste2';

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
const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmdXp6eSIsInN1YiI6IjMiLCJleHAiOjE3MjQ0NTYyODIsImlhdCI6MTcyNDM2OTg4Miwic2NvcGUiOiJhZG1pbiJ9.RtcYVjXSMwZVMCQaf7BbMle9yy5bsVnxYe4ww_H0hcDzsQRjTB8l5qfujK8ddlvo2DVttCmGdu8uZmYOM2_JUcy02Mfrr1epylrz5BQP7XeWFlvhXGbees7BF0P1foN9UU8APazSl30QzoFE37F5JHLetFtNunh70DlnlOcl6gewwFqKqysbRvu985T1K_kWBxxYuSClvvTF_IkcKURRuWb8rk65vr4X2TFPAir1ePv5gpoyllM4i_EeJJPb_8RVJDNgBzUNhvE_KFP5wbiqUHxdQNMVrbgMwPfq4kCfIq-p71v5tw0A1r8GIG2h1sEYZNU50In5RgirA3Tk9joAGg'
// Pode-se passar por parâmetro pois im cpmponente no fundo é uma função, que a função anonima recebera (label)

function App() {
  return (

    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Rotas para os banners específicos */}
            <Route element={<Layout />}>

              <Route path='*' element={<NaoEncontrada />} />
              <Route path='/digite-o-email' element={<DigiteSeuEmail />} />
              <Route path='/esqueci-a-senha' element={<Esqueciasenha />} />
              <Route path='/digite-o-codigo' element={<DigiteCodigo />} />
              <Route path='/login' element={<Login />} />
            </Route>
            {/* Rotas para todo o resto */}
            <Route element={<Layout />}>
              <Route path="/treinamentos" element={<Treinamentos />} />
              <Route path="/adicionar-treinamentos" element={<AdicionaTreinamento />} />
              <Route path="/editar-treinamentos" element={<EditarTreinamento />} />
              <Route path="/treinamentos/:id" element={<TreinamentoInfo />} />
              <Route path='/' element={<Home />} />
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
    </ThemeProvider>

  );
}

export default App;
