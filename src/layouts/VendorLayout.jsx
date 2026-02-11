import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Package,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/vendor/dashboard", icon: Home },
    { name: "Categories", path: "/vendor/categories", icon: Package },
    { name: "Products", path: "/vendor/products", icon: Package },
    { name: "Orders", path: "/vendor/orders", icon: ShoppingBag },

  ];

  const isActive = (path) => location.pathname.startsWith(path);
 

  const handleLogout = () => {
    logout();
    navigate("/vendor/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ================= DESKTOP SIDEBAR (FIXED) ================= */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col fixed inset-y-0 left-0 z-40">
        {/* Logo/Brand */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
              I
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">I Am Shop</span>
              <p className="text-xs text-gray-500">Vendor Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={active ? "text-white" : ""} />
                  <span>{item.name}</span>
                </div>
                {active && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-green-600 flex items-center justify-center font-bold text-lg">
                    I
                  </div>
                  <div>
                    <span className="font-bold text-lg text-white">I Am Shop</span>
                    <p className="text-xs text-green-100">Vendor Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                        ${
                          active
                            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span>{item.name}</span>
                      </div>
                      {active && <ChevronRight size={16} />}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3.5 mt-4 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium transition-all duration-200"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 md:ml-64">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Menu size={22} />
              </button>
              <h1 className="text-lg font-bold text-gray-800">
                Vendor Panel
              </h1>
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 text-white flex items-center justify-center font-bold text-sm shadow-md">
              V
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-h-[calc(100vh-73px)] p-5 pb-24 md:pb-6">
          <Outlet />
        </main>

        {/* ================= MOBILE BOTTOM NAV ================= */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg flex md:hidden z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium transition-colors
                  ${
                    active
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default VendorLayout;