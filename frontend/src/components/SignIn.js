import React from 'react';
import './SignIn.css';

const SignIn = () => {
  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form>
        <label>Email:</label>
        <input type="email" />
        <label>Password:</label>
        <input type="password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
