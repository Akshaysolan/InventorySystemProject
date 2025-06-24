import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css'; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        <div className="navbar-left">
            <span className="project-title">Inventory System</span>
        </div>
        <div className="navbar-center">
         
        </div>
        <div className="navbar-right">
          <ul className="navbar-nav-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </ul>
          {user && (
            <div className="navbar-user-actions">
              <span className="navbar-welcome">{user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
