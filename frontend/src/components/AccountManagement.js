import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import MenuBar from './MenuBar';
import '../App.css'; 

function AccountManagement() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/update', 
        { username, password, newPassword }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setSuccess('User information updated successfully');
    } catch (error) {
      console.error('Error updating user information', error);
      setError('Error updating user information');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/user/delete', 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account', error);
      setError('Error deleting account');
    }
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const loginusername = decodedToken.username;

  return (
    <div>
    <MenuBar />
      <h2>Account Management</h2>
      <input
        type="text"
        placeholder={loginusername}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Current Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Information</button>
      <button onClick={handleDelete}>Delete Account</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
}

export default AccountManagement;
