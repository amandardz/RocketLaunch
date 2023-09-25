import Container from '../components/Container/Container';
import LoginForm from '../components/CredentialForms/LoginForm';
import SignupForm from '../components/CredentialForms/SignupForm';

const Credentials = () => {
  return (
    <div className='h-screen flex flex-col justify-evenly items-center'>
      <Container className='rounded-2xl mb-2 md:w-5/12 bg-space-blue'>
        <SignupForm />
      </Container>
      <Container className='rounded-2xl md:w-5/12 bg-space-blue'>
        <LoginForm />
      </Container>
    </div>
  );
};

export default Credentials;
