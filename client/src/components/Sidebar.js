import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../App';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, login } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { openModal } = useModal();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}${darkMode ? ' dark' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={() => setCollapsed((c) => !c)}>
          <span>{collapsed ? '☰' : '✖'}</span>
        </button>
        {!collapsed && (
          <div className="sidebar-logo">
            <span className="logo-icon">✔️</span>
            <span className="logo-text">TaskManager</span>
          </div>
        )}
      </div>
      <div className="sidebar-actions">
        <button className="sidebar-btn" title="Timer" onClick={() => openModal('timer')}><span>⏱️</span></button>
        <button className="sidebar-btn" title="Search" onClick={() => openModal('search')}><span>🔍</span></button>
        <button className="sidebar-btn" title="Add Task" onClick={() => openModal('addTask')}><span>＋</span></button>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section">My Tasks</div>
        <Link to="/dashboard" className={`sidebar-link${location.pathname === '/dashboard' ? ' active' : ''}`}>All tasks <span className="count">1</span></Link>
        <Link to="/today" className={`sidebar-link${location.pathname === '/today' ? ' active' : ''}`}>Today <span className="count">0</span></Link>
      </nav>
      <div className="sidebar-signin">
        {!user && <button className="sidebar-link" onClick={login}>+ Sign In / Sign Up</button>}
      </div>
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>{darkMode ? '🌙' : '☀️'} Mode</button>
        <div className="footer-links">
          <a href="#">Pricing</a> • <a href="#">Support</a> • <a href="#">Terms</a> • <a href="#">Privacy</a>
        </div>
        <div className="footer-copy">©2025 TaskManager AS</div>
      </div>
    </aside>
  );
};

export default Sidebar; 