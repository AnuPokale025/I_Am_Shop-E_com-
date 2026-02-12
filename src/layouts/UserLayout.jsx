import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  Heart,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const UserLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userMenu, setUserMenu] = useState(false);

  const [location, setLocation] = useState("Select Location");
  const [locationModal, setLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  // Load location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?q=${query}`);
  };

  const saveLocation = () => {
    if (tempLocation.trim()) {
      setLocation(tempLocation);
      localStorage.setItem("userLocation", tempLocation);
      setLocationModal(false);
      setTempLocation("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          
          {/* Logo */}
          <Link to="/" className="text-green-600 font-extrabold text-xl">
            i Am <span className="text-black">Shop</span>
          </Link>

          {/* Location */}
          <div
            onClick={() => setLocationModal(true)}
            className="hidden md:flex items-center text-sm text-gray-600 gap-1 cursor-pointer hover:text-green-600"
          >
            <MapPin className="h-4 w-4 text-green-600" />
            <span>{location}</span>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 flex bg-gray-100 rounded-xl px-3 py-2"
          >
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search groceries, snacks..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4 relative">
            
            {/* Wishlist */}
            <Link to="/wishlist">
              <Heart className="h-6 w-6 text-gray-600" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
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
                className="flex items-center gap-1"
              >
                <User className="h-6 w-6 text-gray-700" />
                <span className="hidden md:block text-sm font-medium">
                  {user?.name?.split(" ")[0] || "Account"}
                </span>
              </button>

              {userMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
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
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* LOCATION MODAL */}
      {locationModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-4">Enter Your Location</h2>
            <input
              type="text"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              placeholder="Enter city or address"
              className="w-full px-3 py-2 border rounded-lg mb-4 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setLocationModal(false)}
                className="px-4 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveLocation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="bg-white w-64 h-full p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-lg">Menu</h2>
              <X onClick={() => setMenuOpen(false)} />
            </div>

            <Link to="/" className="block py-2">Home</Link>
            <Link to="/categories" className="block py-2">Categories</Link>
            <Link to="/products" className="block py-2">Products</Link>
            <Link to="/orders" className="block py-2">Orders</Link>

            <button onClick={logout} className="mt-4 text-red-500">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
        © 2026 I Am Shop Store
      </footer>
    </div>
  );
};

export default UserLayout;
