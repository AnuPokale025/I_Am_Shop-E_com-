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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/vendor/dashboard", icon: Home  },
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
    <div className="min-h-screen bg-[#f7f7f7] flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className=" hidden md:flex w-64 bg-white border-r flex-col fixed inset-y-0">
        <div aria-readonly className="px-6 py-5 border-b flex items-center gap-2">
          <div aria-readonly className="w-9 h-9 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold">
            I
          </div>
          <span className="text-lg font-bold">I Am Shop</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
                  ${
                    isActive(item.path)
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <span className="font-bold text-lg">I Am Shop</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                        ${
                          isActive(item.path)
                            ? "bg-green-100 text-green-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 mt-3 rounded-xl text-red-600 hover:bg-red-50 text-sm"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </motion.aside>

            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-white border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu />
            </button>

            <h1 className="text-sm font-semibold text-gray-800">
              Vendor Panel
            </h1>

            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm">
              V
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-4 pb-24 md:pb-6">
          <Outlet />
        </main>

        {/* ================= MOBILE BOTTOM NAV ================= */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex md:hidden z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 py-2 flex flex-col items-center text-xs
                  ${
                    isActive(item.path)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default VendorLayout;
