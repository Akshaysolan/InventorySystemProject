import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useInventory from '../hooks/UseInventory';
import "../css/login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { setAlert } = useInventory();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password) {
      setAlert('Please fill in all fields', 'danger');
      return;
    }

    setLoading(true);
    try {
      const success = await login(credentials);
      if (success) {
        setAlert('Login successful!', 'success');
        navigate('/');
      }
    } catch (err) {
      setAlert(err.message || 'Login failed. Please check your credentials.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bubble" style={{ top: '20%', left: '10%', width: '40px', height: '40px' }}></div>
      <div className="login-bubble" style={{ top: '50%', left: '80%', width: '30px', height: '30px' }}></div>
      <div className="login-left">
        <div className="login-arrow-circle">
          <div className="login-rotating-arrows">
            <div className="login-arrow">&#10148;</div>
            <div className="login-arrow">&#10148;</div>
            <div className="login-arrow">&#10148;</div>
          </div>
        </div>
      </div>
      <div class="login-center">
        <div class="login-card">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="username" className="login-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="login-register-link">
              Don’t have an account? <a href="/register">Register here</a>
            </p>
          </form>
        </div>
      </div>
      <div className="login-left">
        <div className="login-outer-rotate">
          <div className="login-arrow-circle">
            <div className="login-rotating-arrows">
              <div className="login-arrow">&#10148;</div>
              <div className="login-arrow">&#10148;</div>
              <div className="login-arrow">&#10148;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
