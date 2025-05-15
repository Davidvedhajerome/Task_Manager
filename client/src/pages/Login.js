import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to TaskManager</h1>
        <p>Organize your tasks efficiently and boost your productivity</p>
        <button onClick={login} className="google-login-button">
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Sign in with Google
        </button>
        <div className="features">
          <div className="feature">
            <h3>Task Organization</h3>
            <p>Create, organize, and prioritize your tasks with ease</p>
          </div>
          <div className="feature">
            <h3>Team Collaboration</h3>
            <p>Work together with your team members seamlessly</p>
          </div>
          <div className="feature">
            <h3>Progress Tracking</h3>
            <p>Monitor your progress and stay on top of your goals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 