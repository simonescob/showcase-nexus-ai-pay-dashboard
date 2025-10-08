import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('free'); // free, pro, enterprise
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('role');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setRole(storedRole || 'free');

        // Verify token is still valid by fetching current user
        try {
          await api.getCurrentUser();
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          setToken(null);
          setUser(null);
          setRole('free');
        }
      }

      setLoading(false);
      setInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    console.log('AuthContext login called with email:', email);
    try {
      setLoading(true);
      console.log('AuthContext login - calling api.login');
      const response = await api.login(email, password);
      console.log('AuthContext login - api response:', response);

      const { token: newToken } = response;

      // Store token first
      setToken(newToken);
      localStorage.setItem('token', newToken);

      // Fetch user profile with the new token
      console.log('AuthContext login - fetching user profile');
      const userData = await api.getCurrentUser();
      console.log('AuthContext login - user data:', userData);

      console.log('AuthContext login - setting user:', userData);
      setUser(userData);
      setRole(userData.role || 'free');

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', userData.role || 'free');

      console.log('AuthContext login - success, returning { success: true }');
      return { success: true };
    } catch (error) {
      console.log('AuthContext login - error:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    console.log('AuthContext register called with email:', email, 'name:', name);
    try {
      setLoading(true);
      console.log('AuthContext register - calling api.register');
      const response = await api.register(email, password, name);
      console.log('AuthContext register - api response:', response);

      const { token: newToken } = response;

      // Store token first
      setToken(newToken);
      localStorage.setItem('token', newToken);

      // Fetch user profile with the new token
      console.log('AuthContext register - fetching user profile');
      const userData = await api.getCurrentUser();
      console.log('AuthContext register - user data:', userData);

      console.log('AuthContext register - setting user:', userData);
      setUser(userData);
      setRole(userData.role || 'free');

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', userData.role || 'free');

      console.log('AuthContext register - success, returning { success: true }');
      return { success: true };
    } catch (error) {
      console.log('AuthContext register - error:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole('free');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
  };

  const updateSubscription = (newRole) => {
    setRole(newRole);
    setUser(prev => prev ? { ...prev, role: newRole } : null);
    localStorage.setItem('role', newRole);
    if (user) {
      localStorage.setItem('user', JSON.stringify({ ...user, role: newRole }));
    }
    toast.success(`Subscription updated to ${newRole} plan`);
  };

  const refreshUserProfile = async () => {
    try {
      const updatedUser = await api.getCurrentUser();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      toast.error('Failed to refresh user profile');
      throw error;
    }
  };

  const value = {
    user,
    token,
    role,
    loading,
    initialized,
    login,
    register,
    logout,
    updateSubscription,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};