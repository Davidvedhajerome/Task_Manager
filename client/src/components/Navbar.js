import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TaskManager</Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <div className="navbar-user">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="logout-button">Logout</button>
            </div>
          </>
        ) : (
          <Link to="/login" className="navbar-item">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 