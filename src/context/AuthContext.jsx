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

  const isTokenValid = (token) => !!token;

  const safeParse = (value) => {
    try {
      if (!value || value === "undefined") return null;
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  /* 🔄 Restore session */
  useEffect(() => {
    const storedToken = Cookies.get("auth_token");

    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
      setUser(safeParse(localStorage.getItem("user")));
      setRole(localStorage.getItem("role"));
      setEmail(localStorage.getItem("email"));
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

  const logout = () => {
    Cookies.remove("auth_token", { path: "/" });
    localStorage.clear();

    setUser(null);
    setToken(null);
    setRole(null);
    setEmail(null);

    navigate("/login", { replace: true });
  };

  const value = {
    user,
    token,
    role,
    email,
    loading,
    isAuthenticated: !!token,   // ✅ IMPORTANT CHANGE
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
