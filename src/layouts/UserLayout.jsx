import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  MapPin,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import LocationModal from "../components/modal/LocationModal";

const UserLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState("Select Location");

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) setLocation(savedLocation);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between h-16">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-6">

              {/* Logo */}
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight"
              >
                <span className="text-green-600">IAm</span>
                <span className="text-gray-800">Shop</span>
              </Link>

              {/* Location */}
              <button
                onClick={() => setOpenLocation(true)}
                className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-black"
              >
                <MapPin size={16} />
                <span>{location}</span>
              </button>
            </div>

            {/* CENTER SECTION (Search) */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl mx-6"
            >
              <div className="w-full flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-500 transition">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent w-full ml-3 outline-none text-sm"
                />
              </div>
            </form>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-6">

              {/* Wishlist */}
              <Link to="/wishlist" className="relative">
                <Heart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 hover:text-green-600"
                >
                  <User className="h-6 w-6 text-gray-700" />
                  <span className="hidden md:block text-sm font-medium">
                    {user?.name?.split(" ")[0] || "Account"}
                  </span>
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <button
                className="md:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <Menu />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-4"
          >
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent w-full ml-3 outline-none text-sm"
              />
            </div>
          </form>

        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="bg-white w-64 h-full p-5">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-lg">Menu</h2>
              <X onClick={() => setMenuOpen(false)} />
            </div>

            <div className="flex flex-col gap-4">
              <Link to="/">Home</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/products">Products</Link>
              <Link to="/orders">Orders</Link>
              <button onClick={logout} className="text-red-500 text-left">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      <LocationModal
        isOpen={openLocation}
        onClose={() => setOpenLocation(false)}
      />

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
        © 2026 IAmShop Store
      </footer>
    </div>
  );
};

export default UserLayout;
