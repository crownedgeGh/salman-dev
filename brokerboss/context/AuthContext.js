'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userRole: null,       // 'buyer' | 'owner' | 'broker' | null
  userProfile: null,    // role-specific profile object | null
  register: () => {},
  logout: () => {},
  toggleLogin: () => {}, // @deprecated — use logout() instead
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // true until first profile check resolves

  // Check session on mount
  useEffect(() => {
    import('@/lib/axios').then(({ default: api }) => {
      api.get('/users/profile')
        .then(res => {
          setIsLoggedIn(true);
          setUserProfile(res.data);
          setUserRole(res.data.role || 'buyer');
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUserProfile(null);
          setUserRole(null);
        })
        .finally(() => {
          setAuthLoading(false);
        });
    });
  }, []);

  const register = async (role, profile) => {
    try {
      const api = (await import('@/lib/axios')).default;
      // We assume profile contains name, email, password, etc.
      const res = await api.post('/auth/register', { ...profile, role });
      // After register, you might want to login automatically or just set state
      setIsLoggedIn(true);
      setUserRole(role);
      setUserProfile(profile);
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const api = (await import('@/lib/axios')).default;
      const res = await api.post('/auth/login', { email, password });
      setIsLoggedIn(true);
      setUserProfile(res.data.user);
      setUserRole(res.data.user.role || 'buyer');
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  const updateProfile = (newData) => {
    setUserProfile((prev) => ({ ...prev, ...newData }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserProfile(null);
    // Ideally call a logout endpoint to clear HTTP cookie, but for now just clear state
  };

  const toggleLogin = () => {
    if (isLoggedIn) logout();
    else setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authLoading, userRole, userProfile, register, login, logout, toggleLogin, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
