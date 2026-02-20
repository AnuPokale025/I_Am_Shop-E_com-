import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  MapPin,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import wishlistAPI from "../api/wishlist.api";
import LocationModal from "../components/modal/LocationModal";

const UserLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState("Select Location");
  const [wishlistCount, setWishlistCount] = useState(0);

  const userMenuRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  /* ================= FETCH WISHLIST COUNT ================= */
  const fetchWishlistCount = async () => {
    try {
      const res = await wishlistAPI.getWishlist();
      const items = res?.items || [];
      setWishlistCount(items.length);
    } catch (error) {
      console.error("Failed to fetch wishlist count");
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchWishlistCount();

    // Load saved location
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  /* ================= CLOSE USER MENU ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= SEARCH ================= */
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
              <Link to="/" className="text-2xl font-bold tracking-tight">
                <span className="text-green-600">IAm</span>
                <span className="text-gray-800">Shop</span>
              </Link>

              <button
                onClick={() => setOpenLocation(true)}
                className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-black"
              >
                <MapPin size={16} />
                <span>{location}</span>
              </button>
            </div>

            {/* CENTER SECTION */}
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
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getTotalItems() || 0}
                </span>
              </Link>

              {/* User */}
              <div className="relative" ref={userMenuRef}>
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
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1 max-w-full mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
        © 2026 IAmShop Store
      </footer>

      {/* ================= LOCATION MODAL ================= */}
      <LocationModal
        isOpen={openLocation}
        onClose={() => setOpenLocation(false)}
        setLocation={setLocation}
      />
    </div>
  );
};

export default UserLayout;