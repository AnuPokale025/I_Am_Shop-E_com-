import apiClient from './axios';

// Auth API service
const authAPI = {
  // User signup
  signup: async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Vendor login
  vendorLogin: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/vendor/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Resend verification email
  resendVerification: async (email) => {
    try {
      const response = await apiClient.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Export individual functions for direct import
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