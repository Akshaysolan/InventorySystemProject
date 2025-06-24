import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInventory from '../hooks/UseInventory';
import { register } from '../services/auth';
import '../css/register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'INVENTORY_MANAGER'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { setAlert } = useInventory();
  const navigate = useNavigate();

  useEffect(() => {
    setShowForm(true); // Trigger animation
  }, []);

  const roles = [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'INVENTORY_MANAGER', label: 'Inventory Manager' },
    { value: 'PURCHASE_MANAGER', label: 'Purchase Manager' },
    { value: 'ACCOUNTANT', label: 'Accountant' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 3) newErrors.username = 'Must be at least 3 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'At least 6 characters';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      setAlert('Registration successful! Please login.', 'success');
      navigate('/login');
    } catch (err) {
      setAlert(err.message || 'Registration failed', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <div className={`register-card ${showForm ? 'register-slide-in' : ''}`}>
          <h2 className="register-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label className="register-label">Username</label>
              <input
                className={`register-input ${errors.username ? 'register-invalid' : ''}`}
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <div className="register-error">{errors.username}</div>}
            </div>

            <div className="register-form-group">
              <label className="register-label">Email</label>
              <input
                className={`register-input ${errors.email ? 'register-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="register-error">{errors.email}</div>}
            </div>

            <div className="register-form-group">
              <label className="register-label">Password</label>
              <input
                type="password"
                className={`register-input ${errors.password ? 'register-invalid' : ''}`}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="register-error">{errors.password}</div>}
            </div>

            <div className="register-form-group">
              <label className="register-label">Confirm Password</label>
              <input
                type="password"
                className={`register-input ${errors.confirmPassword ? 'register-invalid' : ''}`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="register-error">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="register-form-group">
              <label className="register-label">Role</label>
              <select
                className="register-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="register-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            <p className="register-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        </div>
      </div>
      <div className="register-right">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`register-dot dot-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default RegisterForm;
