import Auth from '../utils/auth'
import Header from '../components/Header/Header';
import MainContent from './MainContent';

const Home = () => {
  return <>{!Auth.loggedIn() ? <Header /> : <MainContent />}</>;
};

export default Home;
