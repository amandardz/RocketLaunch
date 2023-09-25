import Container from '../Container/Container';
import './Header.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.js'
const Header = () => {
  return (
    <Container className='flex flex-col items-center p-7 rounded-2xl bg-space-blue md:p-12'>
      <p className='text-5xl md:text-7xl text-orange flex-wrap text-center'>
        <span className='text-light-blue'>Rocket</span> Launch
      </p>
      <p className='text-lg md:text-2xl text-white text-center'>where you can search for rocket launches</p>
      <Link className='w-full' to='/credentials'>
         <Button>Login/Signup</Button>
      </Link>
    </Container>
  );
};

export default Header;
