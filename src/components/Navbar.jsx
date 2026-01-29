import { ChevronDown, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Categories from "../Pages/Categories";
import ProductSection from "../Pages/ProductSection";
import Snacks from "../Pages/Snacks";
import Footer from "./Footer";
import Cart from "../Pages/Cart.jsx";
import SidebarModal from "./SidebarModal";
import AccountModal from "./AccountModal";
import VendorModal from "../Pages/VendorModal";   // ✅ ADD
import BannerImg from "../assets/new/banner.jpg"

export default function Header({ cartItems, setCartItems }) {
  const [openCart, setOpenCart] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openVendor, setOpenVendor] = useState(false); // ✅ ADD
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cartCount = cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">

          {/* Logo */}
          <div
            className="text-2xl font-extrabold text-yellow-500 cursor-pointer"
            onClick={() => navigate("/nav")}
          >
            I am <span className="text-green-600">Shop</span>
          </div>


          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder='Search "bread"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none"
            />
          </div>

          {/* Vendor Button */}
          <button
            onClick={() => setOpenVendor(true)}   // ✅ OPEN MODAL
            className="rounded-lg px-4 py-2 text-sm font-semibold border hover:bg-gray-100"
          >
            Vendor
          </button>

          {/* Account */}
          <button
            onClick={() => setOpenAccount(true)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg"
          >
            <User size={18} />
            Account
          </button>

          {/* Cart */}
          <button
            onClick={() => setOpenCart(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <ShoppingCart size={18} />
            {cartCount}
          </button>
        </div>
      </header>

      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img
          src={BannerImg}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pages */}
      <Categories />
      <ProductSection searchTerm={searchTerm} />
      <Snacks searchTerm={searchTerm} />
      <Footer />

      {/* Modals */}
      <SidebarModal isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />
      <AccountModal isOpen={openAccount} onClose={() => setOpenAccount(false)} />
      <VendorModal isOpen={openVendor} onClose={() => setOpenVendor(false)} /> {/* ✅ */}
      <Cart isOpen={openCart} onClose={() => setOpenCart(false)} cartItems={cartItems} setCartItems={setCartItems} />
    </>
  );
}
