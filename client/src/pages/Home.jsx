import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import SearchLaunch from './SearchLaunch';
import Dashboard from './Dashboard';

const Home = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === 'dashboard' ? <Dashboard />: <SearchLaunch />}
    </>
  );
};

export default Home;
