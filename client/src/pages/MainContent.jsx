import { useLocation } from 'react-router-dom';
import SearchLaunch from '../components/Search/SearchLaunch';
import Dashboard from '../components/Dashboard/Dashboard';

const MainContent = () => {
  const { pathname } = useLocation();
  return (
    <>
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
