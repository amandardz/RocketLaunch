import { useLocation } from 'react-router-dom';
import SearchLaunch from '../components/Search/SearchLaunch';
import Dashboard from '../components/Dashboard/Dashboard';
import NavBar from '../components/NavBar/NavBar';

const MainContent = () => {
  const { pathname } = useLocation();
  return (
    <>
      <NavBar />
      <main>
        {pathname === '/search' ? (
          <SearchLaunch />
        ) : (
          <Dashboard />
        )}
      </main>
    </>
  );
};

export default MainContent;
