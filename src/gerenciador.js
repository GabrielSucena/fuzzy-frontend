import { Outlet, useLocation } from 'react-router-dom';
import Banner from './components/banner';
import Bannerhome from './components/bannerhome';
import Rodape from './components/rodape';

const Layout = () => {
  const location = useLocation();

  // Define as rotas onde o Banner deve ser exibido
  const bannerRoutes = [
    '/digite-o-email',
    '/esqueci-a-senha',
    '/digite-o-codigo',
    '/login'
  ];

  const showBanner = bannerRoutes.includes(location.pathname);

  return (
    <>
      {showBanner ? <Banner /> : <Bannerhome />}
      <div className="main-content">
        <Outlet />
      </div>
      <Rodape className="rodape-principal" />
    </>
  );
};

export default Layout;
