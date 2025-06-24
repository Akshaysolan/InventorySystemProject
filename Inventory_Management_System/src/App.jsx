import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Alert from './components/Alerts';
import './App.css';
import RegisterForm from './components/Register';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/product" element={<Reports/>} />
              <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
              <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;