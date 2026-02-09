import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔍 Token validation (basic) */
  const isTokenValid = (token) => {
    return !!token;
  };

  /* 🔄 Restore auth on refresh */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedEmail = localStorage.getItem("email");
    const storedToken = Cookies.get("auth_token");

    if (
      storedUser &&
      storedRole &&
      storedEmail &&
      storedToken &&
      isTokenValid(storedToken)
    ) {
      try {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
        setEmail(storedEmail);
        setToken(storedToken);
      } catch (err) {
        clearAuth();
      }
    } else {
      clearAuth();
    }

    setLoading(false);
  }, []);

  /* ✅ Login */
  const login = (userData, userToken, userRole, userEmail) => {
    setUser(userData);
    setToken(userToken);
    setRole(userRole);
    setEmail(userEmail);

    Cookies.set("auth_token", userToken, { expires: 7, path: "/" });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    localStorage.setItem("email", userEmail);
  };

  /* 🚪 Logout */
  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  /* 🧹 Clear everything */
  const clearAuth = () => {
    Cookies.remove("auth_token", { path: "/" });

    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    setUser(null);
    setToken(null);
    setRole(null);
    setEmail(null);
  };

  /* 🔐 Helpers */
  const isAuthenticated = () => {
    return !!token && isTokenValid(token);
  };

  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  const value = {
    user,
    token,
    role,
    email,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
