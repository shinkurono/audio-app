import React, { useState } from 'react';
import axios from 'axios';
import Logout from './Logout';
import {jwtDecode} from 'jwt-decode';
import MenuBar from './MenuBar';
import '../App.css'; 
import './Upload.css'; 

function FileUpload( {onLogout} ) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.username;

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('username', username)
    

    try {
      await axios.post('http://localhost:5000/api/audio/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('File uploaded successfully');
      // Handle success, e.g., show a success message
      setError('File uploaded successfully')
    } catch (error) {
      console.error('Error uploading file', error);
      // Handle error, e.g., show an error message
      setError('Error uploading file')
    }
  };

  return (
    <div>
      <MenuBar />
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleFileUpload}>Upload File</button>
      <br/>
      {error && <p>{error}</p>}
      <br/>
      <a href='/audio'>Listen to uploaded files</a>
      <Logout />
    </div>
  );
}

export default FileUpload;
