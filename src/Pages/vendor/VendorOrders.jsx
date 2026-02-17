import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Package,
  Calendar,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await vendorAPI.getVendorOrders();
      const data = res?.data || res;

      const mappedOrders = (Array.isArray(data) ? data : []).map(
        (order) => ({
          id: order.orderId,
          userId: order.userId,
          vendorId: order.vendorId,
          itemsCount: order.items?.length || 0,
          total:
            Number(order.totalAmount || 0) +
            Number(order.deliveryCharge || 0),
          deliveryCharge: order.deliveryCharge,
          paymentMode: order.paymentMode,
          status: order.orderStatus.toLowerCase(),
          date: new Date(order.estimatedelivery).toLocaleDateString(),
          rawDate: order.estimatedelivery,
        })
      );

      setOrders(mappedOrders);
    } catch (err) {
      console.error("Fetch orders failed", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateOrderStatus = async (orderId, status) => {
    try {
      await vendorAPI.updateOrderStatus(
        orderId,
        status.toUpperCase()
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  /* ================= FILTER ================= */
  const filtered = orders.filter((o) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      o.id.toLowerCase().includes(q) ||
      o.userId.toLowerCase().includes(q);

    const matchesFilter =
      filter === "all" || o.status === filter;

    return matchesSearch && matchesFilter;
  });

  /* ================= UI HELPERS ================= */
  const statusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "shipped":
        return <Truck size={16} className="text-blue-600" />;
      case "cancelled":
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24">
      {/* HEADER */}
      <div className="sticky top-0 bg-white z-40 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">Orders</h1>
          <p className="text-xs text-gray-500">
            {filtered.length} orders
          </p>

          {/* SEARCH */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search by order ID or user ID"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* FILTER */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {[
              "all",
              "processing",
              "shipped",
              "confirmed",
              "cancelled",
            ].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-xs capitalize ${
                  filter === s
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="px-4 mt-4 space-y-4">
        {filtered.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <Package className="mx-auto mb-2" />
            No orders found
          </div>
        )}

        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm p-4"
          >
            {/* TOP */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {statusIcon(order.status)}
                <h3 className="font-semibold text-sm">
                  {order.id}
                </h3>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* DETAILS */}
            <p className="text-xs text-gray-500 mt-1">
              User ID: {order.userId}
            </p>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {order.date}
              </span>

              <span>{order.itemsCount} items</span>

              <span className="font-semibold text-gray-800">
                ₹{order.total}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Payment: {order.paymentMode}
            </p>

            {/* ACTIONS */}
            {/* <div className="flex gap-2 mt-3">
              <Link
                to={`/vendor/orders/${order.id}`}
                className="flex-1 text-center text-xs py-2 rounded-lg border"
              >
                View
              </Link>

              {order.status === "processing" && (
                <>
                  <button
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        "shipped"
                      )
                    }
                    className="flex-1 bg-blue-600 text-white text-xs py-2 rounded-lg"
                  >
                    Ship
                  </button>

                  <button
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        "cancelled"
                      )
                    }
                    className="flex-1 bg-red-500 text-white text-xs py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </>
              )}

              {order.status === "shipped" && (
                <button
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "completed"
                    )
                  }
                  className="flex-1 bg-green-600 text-white text-xs py-2 rounded-lg"
                >
                  Delivered
                </button>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOrders;
