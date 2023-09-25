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
      <form className='p-5' id='login-form'  onSubmit={(e) => handleFormSubmit(e)}>
        <p className='p-2 text-3xl text-center text-white'>Login</p>
        <div className='p-1'>
          <label className='text-xl text-white' htmlFor='email-login'>Email address</label>
          <input
            className='rounded-md w-full'
            type='email'
            id='email-login'
            onChange={handleInputChange}
            name='email'
            value={userFormData.email}
            required
          ></input>
        </div>
        <div className='p-1'>
          <label className='text-xl text-white' htmlFor='password-login'>Password</label>
          <input
          className='rounded-md w-full'
            type='password'
            id='password-login'
            onChange={handleInputChange}
            name='password'
            value={userFormData.password}
            required
          ></input>
        </div>
        <div className='p-1'>
          <Button className='blueBtn text-white' type='submit'>
            Login
          </Button>
        </div>
      </form>
      {error && <div className='text-white text-center'>Login failed</div>}
    </>
  );
}

export default LoginForm;
