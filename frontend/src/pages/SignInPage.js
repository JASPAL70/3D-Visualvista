import React, { useState } from 'react';
import axios from 'axios';
import './SignInPage.css';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/signin', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('Error signing in');
    }
  };

  return (
    <div className="signin-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignInPage;
