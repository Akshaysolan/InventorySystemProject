import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Categories
export const getCategories = () => api.get('/categories');
export const getCategory = (id) => api.get(`/categories/${id}`);
export const createCategory = (category) => api.post('/categories', category);
export const updateCategory = (id, category) => api.put(`/categories/${id}`, category);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Reports
export const getInventoryReport = () => api.get('/reports/inventory');

export const getSalesReport = (timeRange = 'monthly') => 
  api.get(`/reports/sales?timeRange=${timeRange}`);



export default api;