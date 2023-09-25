import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import Auth from '../../utils/auth';

const NavBar = () => {
  return (
    <Container className='z-10 sticky top-0 p-3 bg-space-blue'>
      <nav className='text-white text-xl flex justify-around'>
        <Link className='hover:underline hover:decoration-dotted' to='/search'>Search</Link>
        <Link className='hover:underline hover:decoration-dotted' to='/dashboard'>Dashboard</Link>
        {!Auth.loggedIn() ? <Link className='hover:underline hover:decoration-dotted' to='/credentials'>Login</Link> : <Link className='hover:underline hover:decoration-dotted' onClick={Auth.logout}>Logout</Link>}
      </nav>
    </Container>
  );
};

export default NavBar;
