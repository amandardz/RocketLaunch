import { useState } from 'react';
import Button from '../Button/Button';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function LoginForm() {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      
      Auth.login(data.login.token);
      window.location.assign('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form id='login-form' onSubmit={(e) => handleFormSubmit(e)}>
        <h2>Login</h2>
        <div>
          <label htmlFor='email-login'>Email address</label>
          <input
            type='email'
            id='email-login'
            onChange={handleInputChange}
            name='email'
            value={userFormData.email}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='password-login'>Password</label>
          <input
            type='password'
            id='password-login'
            onChange={handleInputChange}
            name='password'
            value={userFormData.password}
            required
          ></input>
        </div>
        <div>
          <Button className='credentialsBtn' type='submit'>Login</Button>
        </div>
      </form>
      {error && <div>Login failed</div>}
    </>
  );
}

export default LoginForm;
