import React from 'react';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form>
        <label>Email:</label>
        <input type="email" />
        <label>Password:</label>
        <input type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
