import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
        <li>
          <Link to="/audio">Audio List</Link>
        </li>
        <li>
          <Link to="/account">Account Management</Link>
        </li>
        <li>
          <Link to="/" onClick={() => localStorage.removeItem('token')}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
