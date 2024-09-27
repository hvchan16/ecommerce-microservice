import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import setupAxiosInterceptors from './services/axiosConfig';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import ProductsPage from './pages/products/ProductsPage';
import OrdersPage from './pages/orders/OrdersPage';
import Logout from './pages/common/Logout';
import HomePage from './pages/common/HomePage';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  useEffect(() => {
    setupAxiosInterceptors(token);
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/signup" element={<Signup onSignup={login} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path='/' element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/logout" element={<Logout onLogout={logout} />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
