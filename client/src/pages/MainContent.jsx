import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import SearchLaunch from '../components/Search/SearchLaunch';
import Dashboard from '../components/Dashboard/Dashboard';
import Credentials from './Credentials';

const MainContent = () => {
  const { pathname } = useLocation();
  return (
    <>
      {!Auth.loggedIn() ? (
        <Credentials />
      ) : pathname === '/search' ? (
        <SearchLaunch />
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default MainContent;
