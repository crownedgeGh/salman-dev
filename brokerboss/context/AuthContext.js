'use client';

import { createContext, useContext, useState } from 'react';

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

  /** Register a user with a role and profile data */
  const register = (role, profile) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserProfile(profile);
  };

  /** Log out and reset all auth state */
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserProfile(null);
  };

  /** @deprecated Use logout() instead */
  const toggleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userProfile, register, logout, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
