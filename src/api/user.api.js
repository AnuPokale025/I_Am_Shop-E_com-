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
    const res = await apiClient.get("/orders/user");
    return res.data;
  },

  // GET order by id
  getOrderById: async (orderId) => {
    const res = await apiClient.get(`/orders/user/${orderId}`);
    return res.data;
  },

  // 🔥 CREATE ORDER (POST /api/orders)
  createOrder: async (body) => {
    const res = await apiClient.post("/orders", body);
    return res.data;
  },

  // 🔁 UPDATE ORDER STATUS (PATCH)
  updateOrderStatus: async (orderId, status) => {
    const res = await apiClient.patch(
      `/orders/user/${orderId}/status`,
      null,
      {
        params: { status },
      }
    );
    return res.data;
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
export const placeOrder = userAPI.placeOrder;

export const getCategories = userAPI.getCategories;

export default userAPI;
