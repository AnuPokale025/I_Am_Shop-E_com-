import apiClient from "./axios";

const productAPI = {
  getAllProducts: async () => {
    const res = await apiClient.get("/products");
    return res.data;
  },

  getProductById: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  },

  searchProducts: async (query) => {
    const res = await apiClient.get(`/products/search`, {
      params: { q: query },
    });
    return res.data;
  },

  getFeaturedProducts: async () => {
    const res = await apiClient.get("/products/featured");
    return res.data;
  },

  getProductsByCategory: async (categoryId) => {
    const res = await apiClient.get(`/products/category/${categoryId}`);
    return res.data;
  },

  getProductsBySubcategory: async (subcategoryId) => {
    const res = await apiClient.get(`/products/subcategory/${subcategoryId}`);
    return res.data;
  },

  // getRelatedProducts: async (categoryId) => {
  //   const res = await apiClient.get("/products/related", {
  //     params: { categoryId, page: 0, size: 4 },
  //   });
  //   return res.data;
  // },

  getFeedback: async (productId, page = 0, size = 5) => {
    const res = await apiClient.get(
      `/products/${productId}/feedback`,
      { params: { page, size } }
    );
    return res.data;
  },

  addFeedback: async (productId, feedbackData) => {
    const res = await apiClient.post(
      `/products/${productId}/feedback`,
      feedbackData
    );
    return res.data;
  },
};

export default productAPI;
