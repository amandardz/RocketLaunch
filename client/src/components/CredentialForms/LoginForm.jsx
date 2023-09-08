import { useState } from 'react';
import './Signup.css';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

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
      console.log(data);
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
          <button type='submit'>Login</button>
        </div>
      </form>
      {error && <div>Login failed</div>}
    </>
  );
}

export default LoginForm;
