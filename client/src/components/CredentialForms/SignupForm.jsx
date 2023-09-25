import { useState } from 'react';
import Button from '../Button/Button';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
function SignupForm() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className='p-5' id='signup-form' onSubmit={(e) => handleFormSubmit(e)}>
        <p className='text-center text-3xl text-white'>Signup</p>
        <div className='p-1'>
          <label className='text-xl text-white' htmlFor='email-signup'>Email address</label>
          <input
          className='rounded-md w-full'
            type='email'
            id='email-signup'
            onChange={handleInputChange}
            name='email'
            value={userFormData.email}
            required
          ></input>
        </div>
        <div className='p-1'>
          <label className='text-xl text-white' htmlFor='username-signup'>Username</label>
          <input
          className='rounded-md w-full'
            type='text'
            id='username-signup'
            onChange={handleInputChange}
            name='username'
            value={userFormData.username}
            required
          ></input>
        </div>
        <div className='p-1'>
          <label className='text-xl text-white' htmlFor='password-signup'>Password</label>
          <input
          className='rounded-md w-full'
            type='password'
            id='password-signup'
            onChange={handleInputChange}
            name='password'
            value={userFormData.password}
            required
          ></input>
        </div>
        <div className='p-1'>
          <Button className='blueBtn text-white' type='submit'>Signup</Button>
        </div>
      </form>
      {error && <div className='text-white text-center'>Sign up failed</div>}
    </>
  );
}

export default SignupForm;
