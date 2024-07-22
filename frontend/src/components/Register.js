import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      setError('User Registered')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Username already exists. Please choose a different username.');
      } else {
        setError('Registration failed. Please try again later.');
      }
      console.error('Error registering user', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <br/>
      {error && <p>{error}</p>}
      <br/>
      <a href='/'>Go back to Login</a>
    </div>
  );
}

export default Register;
