import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import AudioList from './components/AudioList';
import PrivateRoute from './components/PrivateRoute';
import AccountManagement from './components/AccountManagement';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
            <Route path="/audio" element={<PrivateRoute><AudioList /></PrivateRoute>} />
            <Route path="/account" element={<PrivateRoute><AccountManagement /> </PrivateRoute>} />
          </Routes>
      </Router>
      </header>
      
    </div>
  );
}

export default App;
