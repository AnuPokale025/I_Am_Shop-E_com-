import apiClient from "./axios";

/*
  NOTE:
  Make sure your axios instance already includes:

  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
*/

const handleError = (error) => {
  throw error?.response?.data || error;
};

const authAPI = {
  /* ================= SIGNUP ================= */
  signup: async (userData) => {
    try {
      const res = await apiClient.post("/auth/signup", userData);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= LOGIN ================= */
  login: async (credentials) => {
    try {
      const res = await apiClient.post("/auth/login", credentials);

      // Save token if backend returns it
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= VENDOR LOGIN ================= */
  vendorLogin: async (credentials) => {
    try {
      const res = await apiClient.post(
        "/auth/vendor/login",
        credentials
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= LOGOUT ================= */
  logout: async () => {
    try {
      const res = await apiClient.post("/auth/logout");
      localStorage.removeItem("auth_token");
      return res.data;
    } catch (error) {
      localStorage.removeItem("auth_token");
      handleError(error);
    }
  },

  /* ================= FORGOT PASSWORD ================= */
  forgotPassword: async ({ email, role }) => {
    try {
      const res = await apiClient.post("/auth/forgot-password", {
        email,
        role,
      });
      console.log(res);
      
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= RESET PASSWORD ================= */
  resetPassword: async ({ token, password, role }) => {
    try {
      const res = await apiClient.post("/auth/reset-password", {
        token,
        password,
        role,
      });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= REFRESH TOKEN ================= */
  refreshToken: async () => {
    try {
      const res = await apiClient.post("/auth/refresh");

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= VERIFY EMAIL ================= */
  verifyEmail: async (token) => {
    try {
      const res = await apiClient.post("/auth/verify-email", {
        token,
      });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /* ================= RESEND VERIFICATION ================= */
  resendVerification: async (email) => {
    try {
      const res = await apiClient.post(
        "/auth/resend-verification",
        { email }
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
};

/* ===== Named Exports ===== */
export const signup = authAPI.signup;
export const login = authAPI.login;
export const vendorLogin = authAPI.vendorLogin;
export const logout = authAPI.logout;
export const forgotPassword = authAPI.forgotPassword;
export const resetPassword = authAPI.resetPassword;
export const refreshToken = authAPI.refreshToken;
export const verifyEmail = authAPI.verifyEmail;
export const resendVerification = authAPI.resendVerification;

export default authAPI;
