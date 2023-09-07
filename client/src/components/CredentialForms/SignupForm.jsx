import React, { useState } from "react";
import "./Signup.css";

function SignupForm() {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
  }

  return (
    <form id="signup-form" onSubmit={(e) => handleFormSubmit(e)}>
      <h2>Signup</h2>
      <div>
        <label for="email-signup">Email address</label>
        <input
          type="email"
          id="email-signup"
          onChange={handleInputChange}
          name="email"
          value={userFormData.email}
          required
        ></input>
      </div>
      <div>
        <label for="username-signup">Username</label>
        <input
          type="text"
          id="username-signup"
          onChange={handleInputChange}
          name="username"
          value={userFormData.username}
          required
        ></input>
      </div>
      <div>
        <label for="password-signup">Password</label>
        <input
          type="password"
          id="password-signup"
          onChange={handleInputChange}
          name="password"
          value={userFormData.password}
          required
        ></input>
      </div>
      <div>
        <button type="submit">Signup</button>
      </div>
    </form>
  );
}

export default SignupForm;
