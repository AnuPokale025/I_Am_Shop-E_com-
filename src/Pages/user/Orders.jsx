import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  Calendar,
  MapPin,
  Search,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import userAPI from "../../api/user.api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await userAPI.getOrders(); // ✅ correct usage
      setOrders(normalizeOrders(data));
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  /* ================= NORMALIZE BACKEND ================= */
  const normalizeOrders = (data = []) =>
    data.map((order) => ({
      id: order.orderId || order._id,
      date: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "N/A",
      total: order.totalAmount ?? 0,
      status: mapStatus(order.orderStatus),
      rawStatus: order.orderStatus,
      items: order.items?.length ?? 0,
      deliveryAddress:
        order.deliveryAddress?.fullAddress ||
        order.deliveryAddress ||
        "Address not available"
    }));

  /* ================= STATUS MAP ================= */
  const mapStatus = (status) => {
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

  /* ================= FILTER ================= */
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  /* ================= UI HELPERS ================= */
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

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {error && (
          <div className="mb-6 p-4 bg-red-50 border rounded-xl">
            {error}
          </div>
        )}

        {/* SEARCH */}
        <div className="bg-white p-6 rounded-xl mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order ID"
              className="w-full pl-12 py-3 border rounded-xl"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-xl px-4"
          >
            <option value="all">All</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* ORDERS */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl">
            <Package className="mx-auto text-gray-400" size={40} />
            <p className="mt-4 text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white p-6 rounded-xl border hover:shadow"
              >
                <div className="flex justify-between">
                  <h3 className="font-bold">{order.id}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full flex gap-1 items-center ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.rawStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <Calendar size={14} /> {order.date}
                </p>

                <div className="mt-4 grid grid-cols-2 text-sm">
                  <div>Items: {order.items}</div>
                  <div>Total: ₹{order.total}</div>
                </div>

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
