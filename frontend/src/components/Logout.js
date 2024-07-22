import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Optional: Notify the server to blacklist the token
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      // Remove token from localStorage
      localStorage.removeItem('token');
      // Redirect to login page or homepage
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
      // Handle logout error, e.g., show an error message to the user
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
