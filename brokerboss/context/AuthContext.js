'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  toggleLogin: () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
