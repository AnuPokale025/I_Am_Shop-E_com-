import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  Store,
  Box,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  Search,
  Menu,
  X,
  Zap,
  UserCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= CLOSE SIDEBAR ON ROUTE CHANGE (MOBILE) ================= */
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/admin/products", icon: Box, label: "Products" },
    { path: "/admin/users", icon: Users, label: "Customers" },
    { path: "/admin/vendors", icon: Store, label: "Vendors" }
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold
     ${
       isActive
         ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  const getPageTitle = () => {
    const item = navItems.find(i => i.path === location.pathname);
    return item?.label || "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ================= MOBILE OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:relative z-50
          w-72 h-full
          bg-white border-r border-gray-200
          flex flex-col
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Admin</p>
              <p className="text-xs text-green-600 font-semibold">
                Control Panel
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-4">
          <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <UserCircle className="text-white w-7 h-7" />
            </div>
            <div className="min-w-0">
              <p className="font-bold truncate">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user?.email || "admin@iamshop.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation (Scrollable) */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
              >
                <Menu />
              </button>
              <h1 className="text-2xl font-bold">
                {getPageTitle()}
              </h1>
            </div>

            <div className="hidden md:flex bg-gray-100 rounded-xl px-4 py-2 gap-2 min-w-[300px]">
              <Search className="text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4 text-center text-sm text-gray-600">
          © 2026 Admin Panel ⚡
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
