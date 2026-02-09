import apiClient from "./axios";

const checkoutAPI = {
  /* ================= GET CART FOR CHECKOUT ================= */
  /* ================= GET CART ================= */
  getCheckoutCart: async () => {
    const res = await apiClient.get("/users/cart");
    return res.data;
  },

  /* ================= PLACE ORDER ================= */
  placeOrder: async ({
    items,
    deliveryCharge,
    paymentMode,
    estimatedDelivery,
  }) => {
    const res = await apiClient.post("/orders", {
      items,
      deliveryCharge,   // ✅ FIXED
      paymentMode,
      estimatedDelivery,
    });
    return res.data;
  },

  /* ================= CLEAR CART ================= */
  clearCart: async () => {
    const res = await apiClient.delete("/user/cart");
    return res.data;
  },


  /* ================= GET USER ADDRESSES ================= */
  // GET /addresses
  getAddresses: async () => {
    try {
      const response = await apiClient.get("/addresses");
      return response.data;
    } catch (error) {
      console.error("❌ Fetch addresses failed:", error);
      throw error;
    }
  },


};

export default checkoutAPI;
