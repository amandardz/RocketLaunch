import Card from '../Card/Card';
import './Header.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.js'
const Header = () => {
  return (
    <Card>
      <h1 className='title'>
        <span>Rocket</span> Launch
      </h1>
      <p className='description'>where you can search for rocket launches</p>
      <Link to='/credentials'>
         <Button>Login/Signup</Button>
      </Link>
    </Card>
  );
};

export default Header;
