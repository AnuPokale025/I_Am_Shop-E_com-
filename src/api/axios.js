import axios from "axios";
import Cookies from "js-cookie";

/* ==================== AXIOS INSTANCE ==================== */
const API = axios.create({
  baseURL: "https://iamashop-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* ==================== REQUEST INTERCEPTOR ==================== */
API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token") || Cookies.get("Token");
    console.log('📋 Token check:', { 
      auth_token: Cookies.get("auth_token") ? '✓ exists' : '✗ missing',
      Token: Cookies.get("Token") ? '✓ exists' : '✗ missing',
      finalToken: token ? '✓ using' : '✗ none'
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization header added:', `Bearer ${token}`);
    } else {
      console.warn('⚠️ WARNING: No token found in cookies! User might not be authenticated.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ==================== AUTH APIs ==================== */

const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  logout: () => API.post('/auth/logout'),
};

export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);
export const logout = () => API.post('/auth/logout');

export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  API.post("/auth/reset-password", { token, password });

/* ==================== CATEGORY APIs ==================== */
export const getCategories = () => API.get("/categories");
export const getCategoryById = (id) => API.get(`/categories/${id}`);
export const createCategory = (data) => API.post("/categories", data);
export const updateCategory = (id, data) =>
  API.put(`/categories/${id}`, data);
export const deleteCategory = (id) =>
  API.delete(`/categories/${id}`);

/* ==================== SUBCATEGORY APIs ==================== */
export const getSubcategories = () => API.get("/subcategories");
export const getSubcategoriesByCategory = (categoryId) =>
  API.get(`/subcategories/category/${categoryId}`);
export const createSubcategory = (data) =>
  API.post("/subcategories", data);
export const updateSubcategory = (id, data) =>
  API.put(`/subcategories/${id}`, data);
export const deleteSubcategory = (id) =>
  API.delete(`/subcategories/${id}`);

/* ==================== PRODUCT APIs ==================== */
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const getProductsByCategory = (categoryId) =>
  API.get(`/products/category/${categoryId}`);
export const getProductsBySubcategory = (subcategoryId) =>
  API.get(`/products/subcategory/${subcategoryId}`);
export const getFeaturedProducts = () =>
  API.get("/products/featured");
export const searchProducts = (query) =>
  API.get(`/products/search?q=${query}`);
export const createProduct = (data) =>
  API.post("/products", data);
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

/* ==================== USER APIs ==================== */
export const getUserProfile = () => API.get("/user/profile");
export const updateUserProfile = (data) =>
  API.put("/users/profile", data);
export const getUserOrders = () => API.get("/user/orders");
export const getUserOrderById = (orderId) =>
  API.get(`/user/orders/${orderId}`);
export const getUserWishlist = () => API.get("/user/wishlist");
export const addToWishlist = (productId) =>
  API.post("/user/wishlist", { productId });
export const removeFromWishlist = (productId) =>
  API.delete(`/user/wishlist/${productId}`);
export const getUserCart = () => API.get("/user/cart");
export const addToCart = (data) =>
  API.post("/user/cart", data);
export const updateCartItem = (itemId, quantity) =>
  API.put(`/user/cart/${itemId}`, { quantity });
export const removeFromCart = (itemId) =>
  API.delete(`/user/cart/${itemId}`);
export const clearCart = () => API.delete("/user/cart");

/* ==================== VENDOR APIs ==================== */
export const getVendorProducts = () => API.get("/vendor/products");
export const getVendorProductById = (id) =>
  API.get(`/vendor/products/${id}`);
export const createVendorProduct = (data) =>
  API.post("/vendor/products", data);
export const updateVendorProduct = (id, data) =>
  API.put(`/vendor/products/${id}`, data);
export const deleteVendorProduct = (id) =>
  API.delete(`/vendor/products/${id}`);
export const getVendorOrders = () => API.get("/vendor/orders");
export const getVendorOrderById = (orderId) =>
  API.get(`/vendor/orders/${orderId}`);
export const updateVendorOrderStatus = (orderId, status) =>
  API.patch(`/vendor/orders/${orderId}/status`, { status });
export const getVendorDashboard = () =>
  API.get("/vendor/analytics/dashboard");
export const getVendorAnalytics = () =>
  API.get("/vendor/analytics");

/* ==================== ORDER APIs ==================== */
export const createOrder = (data) => API.post("/orders", data);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}/status`, { status });
export const orderCheckout = (data) => API.post("/orders", data);

/* ==================== ADMIN APIs ==================== */
export const adminAPI = {
  registerAdmin: (data) => API.post("/admin/register", data),

  getStats: () => API.get("/admin/dashboard/stats"),

  getUsers: () => API.get("/admin/users"),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),

  getVendors: () => API.get("/admin/vendors"),
  deleteVendor: (id) => API.delete(`/admin/vendors/${id}`),

  getAdmins: () => API.get("/admin/admins"),
  deleteAdmin: (id) => API.delete(`/admin/admins/${id}`),

  getCategories: () => API.get("/admin/categories"),
  getSubCategories: () => API.get("/admin/subcategories"),

  getProducts: () => API.get("/admin/products"),
  getProductsByVendor: (vendorId) =>
    API.get(`/admin/products/vendor/${vendorId}`),
  deleteProduct: (id) =>
    API.delete(`/admin/products/${id}`),

  getOrders: () => API.get("/admin/orders"),
  getOrdersByVendor: (vendorId) =>
    API.get(`/admin/orders/vendor/${vendorId}`),
  updateOrderStatus: (id, status) =>
    API.put(`/admin/orders/${id}/status`, { status }),
};

/* ==================== GROUPED EXPORTS ==================== */
export const categoryAPI = {
  getAll: getCategories,
  getById: getCategoryById,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
};

export const productAPI = {
  getAll: getProducts,
  getById: getProductById,
  getByCategory: getProductsByCategory,
  getBySubcategory: getProductsBySubcategory,
  getFeatured: getFeaturedProducts,
  search: searchProducts,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
};

export const userAPI = {
  getProfile: getUserProfile,
  updateProfile: updateUserProfile,
  getOrders: getUserOrders,
  getOrderById: getUserOrderById,
  getWishlist: getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  getCart: getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};

export const vendorAPI = {
  getProducts: getVendorProducts,
  getProductById: getVendorProductById,
  createProduct: createVendorProduct,
  updateProduct: updateVendorProduct,
  deleteProduct: deleteVendorProduct,
  getOrders: getVendorOrders,
  getOrderById: getVendorOrderById,
  updateOrderStatus: updateVendorOrderStatus,
  getDashboard: getVendorDashboard,
  getAnalytics: getVendorAnalytics,
};

export const orderAPI = {
  create: createOrder,
  getById: getOrderById,
  updateStatus: updateOrderStatus,
};

export const subcategoryAPI = {
  getAll: getSubcategories,
  getByCategory: getSubcategoriesByCategory,
  create: createSubcategory,
  update: updateSubcategory,
  delete: deleteSubcategory,
};

export const auth = authAPI;
export default API;
