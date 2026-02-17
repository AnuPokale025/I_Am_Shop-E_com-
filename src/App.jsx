import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ErrorProvider } from "./context/ErrorContext";
import { LoadingProvider } from "./context/LoadingContext";

import ProtectedRoute from "./components/ProtectedRoute";
import GlobalErrorDisplay from "./components/GlobalErrorDisplay";

// Layouts
import UserLayout from "./layouts/UserLayout";
import VendorLayout from "./layouts/VendorLayout";

// Auth pages
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import ResetPassword from "./Pages/auth/ResetPassword";

// User pages
import Home from "./Pages/user/Home";
import Category from "./Pages/user/Category";
import Products from "./Pages/user/Products";
import ProductDetail from "./Pages/user/ProductDetail";
import Cart from "./Pages/user/Cart";
import Checkout from "./Pages/user/Checkout";
import OrderSuccess from "./Pages/user/OrderSuccess";
import Orders from "./Pages/user/Orders";
import OrderDetail from "./Pages/user/OrderDetail";
import Wishlist from "./Pages/user/Wishlist";
import Profile from "./Pages/user/Profile";
import Addresses from "./Pages/user/Addresses";

// Vendor pages
import VendorLogin from "./Pages/vendor/VendorLogin";
import VendorDashboard from "./Pages/vendor/VendorDashboard";
import VendorProducts from "./Pages/vendor/VendorProducts";
import AddProduct from "./Pages/vendor/AddProduct";
import EditProduct from "./Pages/vendor/EditProduct";
import VendorOrders from "./Pages/vendor/VendorOrders";
import VendorOrderDetail from "./Pages/vendor/VendorOrderDetail";
// import VendorAnalytics from "./Pages/vendor/VendorAnalytics";
import EditCategory from "./Pages/vendor/EditCategory";




// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminUser from "./Pages/admin/AdminUser";
import AdminOrder from "./Pages/admin/AdminOrder";
import AdminVendor from "./Pages/admin/AdminVendor";
import AdminProduct from "./Pages/admin/AdminProduct";
import VendorCategory from "./Pages/vendor/VendorCategory";
import AddCategory from "./Pages/vendor/AddCategory";
import SearchProducts from "./Pages/user/SearchProduct";
import SubCategory from "./Pages/user/Subcategory";



function App() {
  return (
    <ErrorProvider>
      <Router>
        <AuthProvider>
          <LoadingProvider>
            <CartProvider>
              <GlobalErrorDisplay />

              <Routes>
                {/* ================= PUBLIC ROUTES ================= */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Vendor public */}
                <Route path="/vendor/login" element={<VendorLogin />} />

                {/* ================= USER PROTECTED ================= */}
                <Route
                  element={
                    <ProtectedRoute requiredRole="USER">
                      <UserLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Category />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/search" element={<SearchProducts />} />
                  <Route path="/subcategories" element={<SubCategory />} />
                  <Route path="//subcategory/:subId/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetail />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/addresses" element={<Addresses />} />
                </Route>

                {/* ================= VENDOR PROTECTED ================= */}
                <Route
                  element={
                    <ProtectedRoute requiredRole="VENDOR">
                      <VendorLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                  <Route path="/vendor/categories" element={<VendorCategory />} />
                  <Route path="/vendor/products" element={<VendorProducts />} />
                  {/* <Route path="/vendor/user" element={<VendorUser/>} /> */}
                  <Route path="/vendor/products/add" element={<AddProduct />} />
                  <Route path="/vendor/categories/add" element={<AddCategory />} />
                  <Route path="/vendor/categories/:id" element={<EditCategory />} />
                  <Route path="/vendor/products/:id" element={<EditProduct />} />
                  <Route path="/vendor/orders" element={<VendorOrders />} />
                  <Route
                    path="/vendor/orders/:id"
                    element={<VendorOrderDetail />}
                  />
                  {/* <Route path="/vendor/analytics" element={<VendorAnalytics />} /> */}
                </Route>

                {/* ================= ADMIN PROTECTED ================= */}
                <Route
                  element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUser />} />
                  <Route path="/admin/orders" element={<AdminOrder />} />
                  <Route path="/admin/vendors" element={<AdminVendor />} />
                  <Route path="/admin/products" element={<AdminProduct />} />
                </Route>

              </Routes>
            </CartProvider>
          </LoadingProvider>
        </AuthProvider>
      </Router>
    </ErrorProvider>
  );
}

export default App;
