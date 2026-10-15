import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('pulse_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.warn('Session expired or invalid token:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('pulse_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const register = async (name, email, password, role) => {
    const res = await api.register({ name, email, password, role });
    if (res.success && res.token) {
      localStorage.setItem('pulse_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('pulse_token');
    setToken(null);
    setUser(null);
  };

  // Quick Demo Login Helper
  const quickDemoLogin = async (type = 'admin') => {
    if (type === 'admin') {
      return await login('admin@pulse.io', 'pulse123');
    } else {
      return await login('sarah.analyst@pulse.io', 'pulse123');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        quickDemoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
