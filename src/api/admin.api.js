import apiClient from "./axios";



/* ==================== DASHBOARD ==================== */
export const getAdminStats = () =>
  apiClient.get("/admin/dashboard/stats");



/* ==================== USERS ==================== */
export const getUsers = () =>
  apiClient.get("/admin/users");

export const deleteUser = (id) =>
  apiClient.delete(`/admin/users/${id}`);

/* ==================== VENDORS ==================== */
export const getVendors = () =>
  apiClient.get("/admin/vendors");

export const deleteVendor = (id) =>
  apiClient.delete(`/admin/vendors/${id}`);

/* ==================== ADMINS ==================== */
export const getAdmins = () =>
  apiClient.get("/admin/admins");

export const deleteAdmin = (id) =>
  apiClient.delete(`/admin/admins/${id}`);

/* ==================== CATEGORIES ==================== */
export const getCategories = () =>
  apiClient.get("/admin/categories");

export const getSubCategories = () =>
  apiClient.get("/admin/subcategories");

/* ==================== PRODUCTS ==================== */
export const getProducts = () =>
  apiClient.get("/admin/products");

export const getProductsByVendor = (vendorId) =>
  apiClient.get(`/admin/products/vendor/${vendorId}`);

export const deleteProduct = (id) =>
  apiClient.delete(`/admin/products/${id}`);

/* ==================== ORDERS ==================== */
export const getOrders = () =>
  apiClient.get("/admin/orders");

export const getOrdersByVendor = (vendorId) =>
  apiClient.get(`/admin/orders/vendor/${vendorId}`);

export const updateOrderStatus = (id, status) =>
  apiClient.put(`/admin/orders/${id}/status`, { status });

//====================admin Profie========================
export const getAdminProfile = () =>
  apiClient.get("/admin/admins");

/* ==================== GROUPED EXPORT (OPTIONAL) ==================== */
const adminAPI = {

  getAdminStats,

  getUsers,
  deleteUser,

  getVendors,
  deleteVendor,

  getAdmins,
  deleteAdmin,

  getCategories,
  getSubCategories,

  getProducts,
  getProductsByVendor,
  deleteProduct,

  getOrders,
  getOrdersByVendor,
  updateOrderStatus,

  getAdminProfile,
};

export default adminAPI;
