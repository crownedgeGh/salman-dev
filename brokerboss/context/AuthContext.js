'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userRole: null,       // 'buyer' | 'owner' | 'broker' | null
  userProfile: null,    // role-specific profile object | null
  register: () => {},
  logout: () => {},
  toggleLogin: () => {}, // @deprecated
  authModalOpen: false,
  setAuthModalOpen: () => {},
});

// ── Cache helpers (only called client-side, inside useEffect or event handlers)
const CACHE_KEY = 'bb_auth_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* ignore storage errors */ }
}

function clearCache() {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch { /* ignore */ }
}
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  // IMPORTANT: Always start with server-safe defaults (false/null).
  // Never read sessionStorage in useState initializer — it causes hydration mismatch
  // because server renders false but client immediately reads cache and gets true.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Step 1: Read cache synchronously AFTER hydration (safe — no SSR mismatch)
    const cached = readCache();
    if (cached) {
      // Instantly apply cached auth state — eliminates blank screen on navigation
      setIsLoggedIn(true);
      setUserProfile(cached);
      setUserRole(cached.role || 'buyer');
      setAuthLoading(false);

      // Step 2: Verify session in background (silent re-check)
      import('@/lib/axios').then(({ default: api }) => {
        api.get('/users/profile')
          .then(res => {
            setUserProfile(res.data);
            setUserRole(res.data.role || 'buyer');
            writeCache(res.data);
          })
          .catch(() => {
            // Cookie expired — clear cache and log out
            setIsLoggedIn(false);
            setUserProfile(null);
            setUserRole(null);
            clearCache();
          });
      });
    } else {
      // No cache — check session normally
      import('@/lib/axios').then(({ default: api }) => {
        api.get('/users/profile')
          .then(res => {
            setIsLoggedIn(true);
            setUserProfile(res.data);
            setUserRole(res.data.role || 'buyer');
            writeCache(res.data);
          })
          .catch(() => {
            setIsLoggedIn(false);
            setUserProfile(null);
            setUserRole(null);
            clearCache();
          })
          .finally(() => {
            setAuthLoading(false);
          });
      });
    }
  }, []);

  const register = async (role, profile) => {
    try {
      const api = (await import('@/lib/axios')).default;
      let res;
      if (profile instanceof FormData) {
        profile.append('role', role);
        res = await api.post('/auth/register', profile, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/auth/register', { ...profile, role });
      }
      
      setIsLoggedIn(true);
      setUserRole(role);
      
      const profileData = profile instanceof FormData ? Object.fromEntries(profile.entries()) : profile;
      const newProfile = { ...profileData, _id: res.data.userId, id: res.data.userId };
      setUserProfile(newProfile);
      writeCache(newProfile);
      
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  const login = async (phone, password) => {
    try {
      const api = (await import('@/lib/axios')).default;
      const res = await api.post('/auth/login', { phone, password });
      setIsLoggedIn(true);
      setUserProfile(res.data.user);
      setUserRole(res.data.user.role || 'buyer');
      writeCache(res.data.user);
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  const updateProfile = (newData) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...newData };
      writeCache(updated);
      return updated;
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserProfile(null);
    clearCache();
  };

  const toggleLogin = () => {
    if (isLoggedIn) logout();
    else setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authLoading, userRole, userProfile, register, login, logout, toggleLogin, updateProfile, authModalOpen, setAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
