import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sri_ruthralaya_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('sri_ruthralaya_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync state on boot
  useEffect(() => {
    async function verifyAuth() {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success && res.data.data) {
            setUser(res.data.data);
            localStorage.setItem('sri_ruthralaya_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Initial session verification failed or expired:', err.message);
          // If 401/403, clear stale session
          if (err.response?.status === 401 || err.response?.status === 403) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('sri_ruthralaya_user');
            localStorage.removeItem('sri_ruthralaya_token');
          }
        }
      }
      setLoading(false);
    }
    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      const { accessToken, user: loggedUser } = res.data.data;
      setToken(accessToken);
      setUser(loggedUser);
      localStorage.setItem('sri_ruthralaya_token', accessToken);
      localStorage.setItem('sri_ruthralaya_user', JSON.stringify(loggedUser));
      return { success: true, user: loggedUser, message: res.data.message };
    }
    return { success: false, message: res.data.message };
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignored
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('sri_ruthralaya_token');
      localStorage.removeItem('sri_ruthralaya_user');
    }
  };

  const refreshUserProfile = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem('sri_ruthralaya_user', JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'staff',
        isStudent: user?.role === 'student',
        login,
        register,
        logout,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
