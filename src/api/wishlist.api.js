import apiClient from "./axios";

const wishlistAPI = {
  // ✅ Get all wishlist items
  getWishlist: async () => {
    try {
      console.log("📤 GET /users/wishlist");
      const response = await apiClient.get("/users/wishlist");
      console.log("✅ Wishlist items:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Get wishlist failed:", error);
      throw error.response?.data || error;
    }
  },

  // ✅ Add product to wishlist (query param: productId)
  addToWishlist: async (productId) => {
    try {
      console.log(`📤 POST /users/wishlist/add?productId=${productId}`);
      const response = await apiClient.post(`/users/wishlist/add?productId=${productId}`);
      console.log("✅ Added to wishlist:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Add to wishlist failed:", error);
      throw error.response?.data || error;
    }
  },

  // ✅ Remove product from wishlist (query param: productId)
  removeFromWishlist: async (productId) => {
    try {
      console.log(`📤 DELETE /users/wishlist/remove?productId=${productId}`);
      const response = await apiClient.delete(`/users/wishlist/remove?productId=${productId}`);
      console.log("✅ Removed from wishlist:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Remove from wishlist failed:", error);
      throw error.response?.data || error;
    }
  },

  // ✅ Clear entire wishlist
  clearWishlist: async () => {
    try {
      console.log("📤 DELETE /users/wishlist/clear");
      const response = await apiClient.delete("/users/wishlist/clear");
      console.log("✅ Wishlist cleared:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Clear wishlist failed:", error);
      throw error.response?.data || error;
    }
  },
};

export default wishlistAPI;
