import apiClient from "./axios";
import Cookies from "js-cookie";

const checkoutAPI = {
  /* ================= GET CART FOR CHECKOUT ================= */
  /* ================= GET CART ================= */
  getCheckoutCart: async () => {
    const res = await apiClient.get("/users/cart");
    return res.data;
  },

  /* ================= PLACE ORDER ================= */
  placeOrder: async ({
    
    deliveryCharge,
    paymentMode,
    estimatedDelivery,
  }) => {
    // Ensure we explicitly attach the same token used in the axios interceptor
    const token =
      Cookies.get("auth_token") 
     

    const res = await apiClient.post(
      "/orders",
      {
        
        deliveryCharge,
        paymentMode,
        estimatedDelivery,
      },
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined
    );

    console.log("Order placed:", res.data);
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
