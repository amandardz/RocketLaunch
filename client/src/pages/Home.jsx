import Auth from '../utils/auth';
import Header from '../components/Header/Header';
import MainContent from './MainContent';

const Home = () => {
  return (
    <>
      {!Auth.loggedIn() ? (
        <main className='h-screen flex items-center justify-center'>
          <Header />
        </main>
      ) : (
        <main>
          <MainContent />
        </main>
      )}
    </>
  );
};

export default Home;
