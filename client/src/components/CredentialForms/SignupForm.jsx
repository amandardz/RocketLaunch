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
      <form id='signup-form' onSubmit={(e) => handleFormSubmit(e)}>
        <h2>Signup</h2>
        <div>
          <label htmlFor='email-signup'>Email address</label>
          <input
            type='email'
            id='email-signup'
            onChange={handleInputChange}
            name='email'
            value={userFormData.email}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='username-signup'>Username</label>
          <input
            type='text'
            id='username-signup'
            onChange={handleInputChange}
            name='username'
            value={userFormData.username}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='password-signup'>Password</label>
          <input
            type='password'
            id='password-signup'
            onChange={handleInputChange}
            name='password'
            value={userFormData.password}
            required
          ></input>
        </div>
        <div>
          <Button className='credentialsBtn' type='submit'>Signup</Button>
        </div>
      </form>
      {error && <div>Sign up failed</div>}
    </>
  );
}

export default SignupForm;
