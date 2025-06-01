import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Cek apakah ada token di localStorage
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const username = localStorage.getItem('username');
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (token && userRole && username && isAuthenticated === 'true') {
          // Verify token dengan backend
          const response = await axiosInstance.get('/api/auth/verify');
          
          if (response.status === 200) {
            // Token valid, restore user state
            setUser({
              username: username,
              role: userRole,
              id: response.data.user?.id,
              email: response.data.user?.email,
              full_name: response.data.user?.full_name
            });
          } else {
            // Token tidak valid, clear localStorage
            clearAuthData();
          }
        }
      } catch (error) {
        console.log('Auth check failed:', error);
        // Jika error (token expired/invalid), clear localStorage
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