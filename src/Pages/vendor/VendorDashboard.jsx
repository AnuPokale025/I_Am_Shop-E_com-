import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
   
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ================= LOAD DASHBOARD ================= */
  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [prodRes, orderRes] = await Promise.all([
        vendorAPI.getProducts(),
        vendorAPI.getVendorOrders(),
        
      ]);

      const prodData = prodRes?.data || prodRes || [];
      const orderData = orderRes?.data || orderRes || [];
      
      setProducts(prodData.slice(0, 5));
      setOrders(orderData.slice(0, 5));
   
      
      setStats({
        totalProducts: prodData.length,
        totalOrders: orderData.length,
       
      });
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center"></div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 md:p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Today’s store performance
          </p>
        </div>

        <Link
          to="/vendor/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat
          title="Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
        />
        
        <Stat
          title="Products"
          value={stats.totalProducts}
          icon={Package}
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        <QuickChip to="/vendor/orders" label="Orders" />
        <QuickChip to="/vendor/products" label="Products" />
        <QuickChip to="/vendor/categories" label="Categories" />
      </div>

      {/* LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard title="Latest Products" link="/vendor/products">
          {products.length === 0 && (
            <p className="text-sm text-gray-400">
              No products found
            </p>
          )}
          {products.map((p) => (
            <Row
              key={p.id || p._id}
              left={p.name}
              right={`₹${p.price}`}
            />
          ))}
        </ListCard>

        <ListCard title="Recent Orders" link="/vendor/orders">
          {orders.length === 0 && (
            <p className="text-sm text-gray-400">
              No orders found
            </p>
          )}
          {orders.map((o) => (
            <Row
              key={o.orderId || o.id}
              left={`Order #${o.orderId || o.id}`}
              right={`₹${o.totalAmount || o.total}`}
            />
          ))}
        </ListCard>
        
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Stat = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-green-100 p-2 rounded-xl">
        <Icon className="h-5 w-5 text-green-600" />
      </div>
    </div>
  </div>
);

const ListCard = ({ title, link, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-semibold text-sm">{title}</h3>
      <Link
        to={link}
        className="text-xs text-green-600 flex items-center gap-1"
      >
        View all <ArrowUpRight size={14} />
      </Link>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Row = ({ left, right }) => (
  <div className="flex justify-between text-sm border-b last:border-none pb-2">
    <span className="text-gray-700">{left}</span>
    <span className="text-gray-500">{right}</span>
  </div>
);

const QuickChip = ({ to, label }) => (
  <Link
    to={to}
    className="bg-white border rounded-full px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50"
  >
    {label}
  </Link>
);

export default VendorDashboard;
