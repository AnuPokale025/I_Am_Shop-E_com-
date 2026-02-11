import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  Calendar,
  MapPin,
  Search,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import userAPI from "../../api/user.api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userAPI.getOrders();

      // ✅ handle multiple backend response formats
      const ordersData =
        response?.orders ||
        response?.data ||
        response ||
        [];

      setOrders(normalizeOrders(ordersData));
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= NORMALIZE BACKEND ================= */
  const normalizeOrders = (data = []) => {
    if (!Array.isArray(data)) return [];

    return data.map((order) => ({
      id: order?.orderId || order?._id || "N/A",
      date: order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "N/A",
      total: Number(order?.totalAmount || order?.total || 0),
      status: mapStatus(order?.orderStatus),
      rawStatus: order?.orderStatus || "CONFIRMED",
      items: order?.items?.length || 0,
      deliveryAddress:
        order?.deliveryAddress?.fullAddress ||
        order?.deliveryAddress ||
        "Address not available",
    }));
  };

  /* ================= STATUS MAP ================= */
  const mapStatus = (status = "") => {
    switch (status) {
      case "CONFIRMED":
        return "processing";
      case "SHIPPED":
        return "shipped";
      case "DELIVERED":
        return "completed";
      case "CANCELLED":
        return "cancelled";
      default:
        return "processing";
    }
  };

  /* ================= FILTER ORDERS ================= */
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const idString = String(order.id || "").toLowerCase();

      const matchesSearch = idString.includes(
        searchQuery.toLowerCase()
      );

      const matchesFilter =
        filter === "all" || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, filter]);

  /* ================= STATUS UI ================= */
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={14} />;
      case "processing":
        return <Clock size={14} />;
      case "shipped":
        return <Truck size={14} />;
      case "cancelled":
        return <XCircle size={14} />;
      default:
        return <Package size={14} />;
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {/* SEARCH + FILTER */}
        <div className="bg-white p-6 rounded-xl mb-6 flex flex-col md:flex-row gap-4 shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order ID"
              className="w-full pl-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* ORDERS LIST */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl shadow-sm">
            <Package className="mx-auto text-gray-400" size={40} />
            <p className="mt-4 text-gray-600">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white p-6 rounded-xl border hover:shadow-md transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">
                    Order ID: {order.id}
                  </h3>

                  <span
                    className={`px-3 py-1 text-xs rounded-full flex gap-1 items-center ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.rawStatus}
                  </span>
                </div>

                {/* DATE */}
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <Calendar size={14} />
                  {order.date}
                </p>

                {/* DETAILS */}
                <div className="mt-4 grid grid-cols-2 text-sm text-gray-700">
                  <div>
                    <strong>Items:</strong> {order.items}
                  </div>
                  <div>
                    <strong>Total:</strong> ₹{order.total}
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="mt-3 text-sm text-gray-600 flex gap-2">
                  <MapPin size={14} />
                  {order.deliveryAddress}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
