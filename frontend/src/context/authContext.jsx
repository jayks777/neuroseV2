import { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../utils/token";

import api from "../api/requests";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const data = await api.getData("/auth/me");

      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");

      setToken(null);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function validateAuth() {
      if (!token) {
        setLoading(false);

        return;
      }

      if (isTokenExpired(token)) {
        logout();

        setLoading(false);

        return;
      }

      try {
        const user = await api.getData("/auth/me");

        setUser(user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    validateAuth();
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem("token", jwt);

    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
