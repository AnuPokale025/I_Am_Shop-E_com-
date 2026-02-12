import apiClient from "./axios";

/* =========================
   USER API SERVICE
========================= */

const userAPI = {
  /* =========================
     PROFILE
  ========================= */

  getProfile: async () => {
    try {
      const res = await apiClient.get("/users/profile");
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await apiClient.put("/users/profile", data);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /* =========================
     ADDRESS
  ========================= */

  getAddresses: async () => {
    try {
      const res = await apiClient.get("/users/address");
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  addAddress: async (addressData) => {
    try {
      const res = await apiClient.post("/users/address", addressData);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateAddress: async (index, addressData) => {
    try {
      const res = await apiClient.put(
        `/users/address/${index}`,
        addressData
      );
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  removeAddress: async (index) => {
    try {
      const res = await apiClient.delete(`/users/address/${index}`);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /* =========================
     ORDERS
  ========================= */
  
  // GET all orders of user
  getOrders: async () => {
    try {
      const res = await apiClient.get("/orders/user");
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET order by id
  getOrderById: async (orderId) => {
    try {
      const res = await apiClient.get(`/orders/user/${orderId}`);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // CREATE ORDER (POST /api/orders)
  createOrder: async (body) => {
    try {
      const res = await apiClient.post("/orders", body);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // UPDATE ORDER STATUS (PATCH)
  updateOrderStatus: async (orderId, status) => {
    try {
      const res = await apiClient.patch(
        `/orders/${orderId}/status`,
        null,
        {
          params: { status },
        }
      );
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // CANCEL ORDER - Multiple API endpoint attempts
  cancelOrder: async (orderId) => {
    try {
      // Try primary endpoint: PATCH with status=CANCELLED
      const res = await apiClient.patch(
        `/orders/${orderId}/status`,
        null,
        {
          params: { status: "CANCELLED" },
        }
      );
      return res.data;
    } catch (error) {
      // If primary fails, try alternative endpoint: POST /orders/:id/cancel
      try {
        const res = await apiClient.post(`/orders/${orderId}/cancel`);
        return res.data;
      } catch (altError) {
        // If that fails too, try PUT with body
        try {
          const res = await apiClient.put(`/orders/${orderId}`, {
            orderStatus: "CANCELLED",
          });
          return res.data;
        } catch (finalError) {
          // If all fail, try DELETE
          try {
            const res = await apiClient.delete(`/orders/${orderId}`);
            return res.data;
          } catch (deleteError) {
            throw error.response?.data || error;
          }
        }
      }
    }
  },

  /* =========================
     CATEGORIES
  ========================= */

  getCategories: async () => {
    try {
      const res = await apiClient.get("/categories");
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

/* =========================
   OPTIONAL NAMED EXPORTS
   (Backward compatibility)
========================= */

export const getProfile = userAPI.getProfile;
export const updateProfile = userAPI.updateProfile;

export const getAddresses = userAPI.getAddresses;
export const addAddress = userAPI.addAddress;
export const updateAddress = userAPI.updateAddress;
export const removeAddress = userAPI.removeAddress;

export const getOrders = userAPI.getOrders;
export const getOrderById = userAPI.getOrderById;
export const createOrder = userAPI.createOrder;
export const updateOrderStatus = userAPI.updateOrderStatus;
export const cancelOrder = userAPI.cancelOrder;

export const getCategories = userAPI.getCategories;

export default userAPI;