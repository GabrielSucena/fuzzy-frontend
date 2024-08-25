import { Outlet, useLocation } from 'react-router-dom';
import Banner from './components/banner';
import Bannerhome from './components/bannerhome';
import Rodape from './components/rodape';

const Layout = () => {
  const location = useLocation();
  
  // Verifica se o token está presente no localStorage
  const token = localStorage.getItem('authToken');

  // Define as rotas onde o Banner deve ser exibido
  const bannerRoutes = [
    '/digite-o-email',
    '/esqueci-a-senha',
    '/digite-o-codigo',
    '/login'
  ];

  // Determina se deve mostrar o Banner ou o Bannerhome

  return (
    <>
      {token ? <Bannerhome/> : <Banner/>}
      <div className="main-content">
        <Outlet />
      </div>
      <Rodape className="rodape-principal" />
    </>
  );
};

export default Layout;
