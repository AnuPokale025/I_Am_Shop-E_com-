import apiClient from './axios';

// Product API service (shared between user and vendor)
const productAPI = {
  // Get all products (for user browsing)
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
 
  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await apiClient.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await apiClient.get('/products/featured');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get products by subcategory
  getProductsBySubcategory: async (subcategoryId) => {
    try {
      const response = await apiClient.get(`/products/subcategory/${subcategoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};






export default productAPI;