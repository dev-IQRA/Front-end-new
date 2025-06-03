import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext.js'; // Adjust path if needed
import axiosInstance from '../utils/axiosInstance';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const username = localStorage.getItem('username');
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (token && userRole && username && isAuthenticated === 'true') {
          const response = await axiosInstance.get('/api/auth/verify');

          if (response.status === 200) {
            setUser({
              username: username,
              role: userRole,
              id: response.data.user?.id,
              email: response.data.user?.email,
              full_name: response.data.user?.full_name
            });
          } else {
            clearAuthData();
          }
        }
      } catch (error) {
        console.log('Auth check failed:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    const clearAuthData = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      setUser(null);
    };

    checkAuthStatus();
  }, []);

  return (
      <UserContext.Provider value={{ user, setUser, loading }}>
        {children}
      </UserContext.Provider>
  );
};