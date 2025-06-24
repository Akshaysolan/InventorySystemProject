import api from './api';

// ✅ LOGIN
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// ✅ REGISTER
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// ✅ GET CURRENT USER
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};
