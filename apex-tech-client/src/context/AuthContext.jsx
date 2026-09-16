import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../api/auth';
import { onUnauthorized } from '../api/client';

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('apexTechUser');
    return raw ? JSON.parse(raw) : null;
  });
  // Fixes the persistence bug: on a hard refresh we don't just trust the
  // cached user object — we ask the backend to confirm the token is still
  // valid before letting the rest of the app (e.g. CartContext) act as if
  // the user is logged in. `initializing` gates that window.
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const persistSession = (data) => {
    localStorage.setItem('apexTechToken', data.token);
    localStorage.setItem('apexTechUser', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('apexTechToken');
    localStorage.removeItem('apexTechUser');
    setUser(null);
  }, []);

  // Validate any cached token once on app load.
  useEffect(() => {
    const token = localStorage.getItem('apexTechToken');
    if (!token) {
      setInitializing(false);
      return;
    }
    getMe()
      .then((res) => {
        localStorage.setItem('apexTechUser', JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch(() => {
        // Token expired/invalid - clear the stale session instead of
        // leaving the UI in a "looks logged in but every request 401s" state.
        logout();
      })
      .finally(() => setInitializing(false));
  }, [logout]);

  // If ANY request 401s later (e.g. token expires mid-session), the axios
  // client fires this so AuthContext's state stays in sync with storage.
  useEffect(() => {
    const unsubscribe = onUnauthorized(() => logout());
    return unsubscribe;
  }, [logout]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser({ email, password });
      persistSession(res.data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser(payload);
      persistSession(res.data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, initializing, loading, error, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
