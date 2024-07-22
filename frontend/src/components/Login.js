import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      // Assuming login was successful and a token is received
      localStorage.setItem('token', response.data.token);
      // Redirect to '/audio' after successful login
      history('/audio');
    } 
    // Handle login error, e.g., display error message to user
    catch (error) {
      if (error.response && error.response.status === 404) {
        setError('User Not Found')
      } else if (error.response && error.response.status === 403) {
        setError('Invalid Credentials')
      } else {
        setError('Login Error, please try again')
      }
      console.error('Error logging in user', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <p>New User? Register Now</p>
      <a href='/register'>Sign up</a>
    </div>
  );
}

export default Login;
