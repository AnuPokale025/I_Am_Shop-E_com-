import apiClient from './axios';

// Vendor API service
const vendorAPI = {
  // Categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // GET CATEGORY BY ID
    getCategoryById: async (categoryId) => {
    try {
      const response = await apiClient.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // UPDATE CATEGORY
  updateCategory: async (categoryId, payload) => {
    const res = await apiClient.put(
      `/categories/${categoryId}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await apiClient.delete(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Subcategories
  getSubcategories: async () => {
    try {
      const response = await apiClient.get('/subcategories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getSubcategoriesByCategory: async (catId) => {
    try {
      const response = await apiClient.get(`/subcategories/category/${catId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createSubcategory: async (subcategoryData) => {
    try {
      const response = await apiClient.post('/subcategories', subcategoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteSubcategory: async (subcategoryId) => {
    try {
      const response = await apiClient.delete(`/subcategories/${subcategoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Products
  getProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateProduct: async (productId, productData) => {
    try {
      // Don't set Content-Type header for FormData - let axios handle it
      // The Authorization header will be added by the interceptor
      const response = await apiClient.put(
        `/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error('PUT ERROR:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.response?.data);
      throw error.response?.data || error;
    }
  },


  deleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Vendor Orders
  getVendorOrders: async () => {
    try {
      const response = await apiClient.get('/orders/vendor');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET single order by ID
  getOrderById: async (orderId) => {
    const res = await apiClient.get(`/vendor/orders/${orderId}`);
    return res.data;
  },

  // UPDATE order status
  updateOrderStatus: async (orderId, status) => {
    const res = await apiClient.patch(
      `/orders/${orderId}/status`,
      null,
      { params: { status } }
    );
    return res.data;
  },
 

  // Dashboard Analytics
  // getDashboardData: async () => {
  //   try {
  //     const response = await apiClient.get('/vendor/dashboard');
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // }
};

export default vendorAPI;