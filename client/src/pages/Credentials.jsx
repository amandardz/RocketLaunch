import Card from '../components/Card/Card';
import LoginForm from '../components/CredentialForms/LoginForm';
import SignupForm from '../components/CredentialForms/SignupForm';

const Credentials = () => {
  return (
    <>
      <Card>
        <SignupForm />
        <LoginForm />
      </Card>
    </>
  );
};

export default Credentials;
