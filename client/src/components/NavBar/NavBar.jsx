import { Link } from 'react-router-dom';
import Card from '../Card/Card';

const NavBar = () => {
  return (
    <Card>
    <nav>
      <Link to='/search'>
      Search
      </Link>
      <Link to='/dashboard'>
      Dashboard
      </Link>
    </nav>

    </Card>
  )
};

export default NavBar;
