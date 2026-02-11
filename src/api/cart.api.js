import apiClient from "./axios";

const cartAPI = {
  /* ================= ADD ================= */
  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await apiClient.post("/users/cart/add", null, {
        params: { productId, quantity },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /* ================= GET ================= */
  getCart: async () => {
    try {
      const res = await apiClient.get("/users/cart");
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /* ================= UPDATE ================= */
  updateQuantity: async (productId, quantity) => {
    try {
      const res = await apiClient.put("/users/cart/update", null, {
        params: { productId, quantity },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /* ================= REMOVE ================= */
  removeFromCart: async (productId) => {
    try {
      const res = await apiClient.delete("/users/cart/remove", {
        params: { productId },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default cartAPI;
