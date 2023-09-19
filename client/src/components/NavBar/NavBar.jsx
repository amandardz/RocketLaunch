import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Auth from '../../utils/auth';

const NavBar = () => {
  return (
    <Card>
      <nav>
        <Link to='/search'>Search</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link onClick={Auth.logout}>Logout</Link>
      </nav>
    </Card>
  );
};

export default NavBar;
