import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, getCurrentUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      const userData = await apiLogin(credentials);
      setUser(userData);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};