import { ChevronDown, MapPin, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cart from "./Cart.jsx";
import SidebarModal from "../components/SidebarModal.jsx";
import AccountModal from "../components/AccountModal.jsx";
import VendorModal from "./VendorModal.jsx";
import MapModal from "../components/MapModal.jsx";
import { useSearch } from "../context/SearchContext.jsx";

export default function Layout({ cartItems, setCartItems }) {
  const [openCart, setOpenCart] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  // State for current location
  const [currentLocation, setCurrentLocation] = useState("Ganeshpeth, Nagpur, Maharashtra");

  const handleLocationChange = (location) => {
    setCurrentLocation(location.name);
  };

  // Navigate to search results when search query exists
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/search') {
        navigate('/search');
      }
    }
  };

  const cartCount = cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

  const handleAccountChange = (e) => {
    const value = e.target.value;

    if (value === "orders") navigate("/order");
    if (value === "address") navigate("/add");
    if (value === "profile") navigate("/profile");
    if (value === "logout") {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    }

    e.target.value = "";
  };

  return (
    <>
      {/* Responsive Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">

          {/* Menu & Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setOpenSidebar(true)}
              className="rounded-lg p-1.5 hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            <div 
              className="text-lg font-extrabold text-yellow-500 sm:text-2xl md:text-3xl cursor-pointer" 
              onClick={() => navigate("/nav")}
            >
              I am <span className="text-green-600">Shop</span>
            </div>

            <div className="hidden cursor-pointer flex-col lg:flex">
              <div className="flex items-center gap-1 text-sm font-semibold">
                Delivery in 8 minutes <ChevronDown size={14} />
              </div>
              <p 
                className="max-w-37.5 truncate text-xs text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => setOpenMap(true)}
              >
                {currentLocation}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative order-3 flex w-full items-center md:order-0 md:flex-1 md:max-w-md lg:max-w-lg">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder='Search "bread"'
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all md:py-3 md:text-base"
            />
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Vendor Button */}
            <button
              onClick={() => setOpenVendor(true)}
              className="hidden md:block rounded-lg px-4 py-2 text-sm font-semibold border hover:bg-gray-100"
            >
              Vendor
            </button>

            {/* Account Button - Hidden on small screens */}
            <button
              onClick={() => setOpenAccount(true)}
              className="hidden items-center gap-1 px-3 py-2 text-sm font-medium hover:text-green-600 transition-colors sm:flex rounded-lg hover:bg-gray-50"
              aria-label="Account"
            >
              <User size={18} className="text-gray-600" />
              <span className="hidden md:inline">Account</span>
              <ChevronDown size={14} className="text-gray-400 hidden md:inline" />
            </button>

            {/* Mobile Account Icon */}
            <button
              onClick={() => setOpenAccount(true)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Account"
            >
              <User size={20} className="text-gray-600" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setOpenCart(true)}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 font-semibold text-white hover:bg-green-700 transition-colors md:px-5 md:py-2.5 shadow-sm"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="text-xs md:text-sm">{cartCount}</span>
              <span className="hidden sm:inline text-xs md:text-sm">items</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Modals */}
      <SidebarModal isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />
      <AccountModal isOpen={openAccount} onClose={() => setOpenAccount(false)} />
      <VendorModal isOpen={openVendor} onClose={() => setOpenVendor(false)} />
      <MapModal 
        isOpen={openMap} 
        onClose={() => setOpenMap(false)} 
        currentLocation={currentLocation}
        onLocationChange={handleLocationChange}
      />
      <Cart
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
}
