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
  ShoppingBag,
  RefreshCw,
  Shield,
  Headphones,
  ArrowRight,
  Info,
  Star,
  TrendingUp,
  Gift,
  Zap,
  ChevronRight,
  X,
  AlertTriangle,
} from "lucide-react";
import userAPI from "../../api/user.api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    fetchOrders();
     window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userAPI.getOrders();
       console.log("Orders fetched:", response);
      // ✅ handle multiple backend response formats
      const ordersData = response?.orders || response?.data || response || [];

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

  /* ================= CANCEL ORDER HANDLER ================= */
  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      setCancellingOrder(true);
      setError("");

      await userAPI.cancelOrder(selectedOrder.id);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: "cancelled", rawStatus: "CANCELLED" }
            : order
        )
      );

      setSuccessMessage("Order cancelled successfully!");
      setShowCancelModal(false);
      setSelectedOrder(null);

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Cancel order error:", err);
      setError(
        err?.message ||
        "Failed to cancel order. Please contact support if the issue persists."
      );
    } finally {
      setCancellingOrder(false);
    }
  };

  /* ================= OPEN CANCEL MODAL ================= */
  const openCancelModal = (e, order) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  /* ================= CLOSE CANCEL MODAL ================= */
  const closeCancelModal = () => {
    if (!cancellingOrder) {
      setShowCancelModal(false);
      setSelectedOrder(null);
    }
  };

  /* ================= CHECK IF ORDER CAN BE CANCELLED ================= */
  const canCancelOrder = (order) => {
    return (
      order.status === "processing" ||
      (order.status === "shipped" &&
        order.rawStatus !== "DELIVERED" &&
        order.rawStatus !== "CANCELLED")
    );
  };

  /* ================= FILTER ORDERS ================= */
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const idString = String(order.id || "").toLowerCase();

      const matchesSearch = idString.includes(searchQuery.toLowerCase());

      const matchesFilter = filter === "all" || order.status === filter;

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

  /* ================= ORDER STATISTICS ================= */
  const orderStats = useMemo(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter((o) => o.status === "completed")
      .length;
    const processingOrders = orders.filter((o) => o.status === "processing")
      .length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      total: totalOrders,
      completed: completedOrders,
      processing: processingOrders,
      totalSpent: totalSpent,
    };
  }, [orders]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="relative">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-green-300 border-b-transparent rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>
          </div> */}
          <div className="min-h-screen flex items-center justify-center text-gray-500">
            Loading orders...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600 text-lg">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* INFORMATIONAL BANNER */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-6 mb-8 text-white shadow-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
                <Truck className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Fast Delivery</h3>
                <p className="text-green-50 text-sm">
                  Track your order in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Secure Payment</h3>
                <p className="text-green-50 text-sm">100% payment protection</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
                <Headphones className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg">24/7 Support</h3>
                <p className="text-green-50 text-sm">We're here to help you</p>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER STATISTICS */}
        {orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">
                    {orderStats.total}
                  </p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">
                    {orderStats.completed}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">
                    {orderStats.processing}
                  </p>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">
                    ₹{orderStats.totalSpent}
                  </p>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="mb-6 p-5 bg-green-50 border-2 border-green-200 rounded-2xl text-green-700 flex items-center gap-3">
            <CheckCircle className="h-6 w-6 flex-shrink-0" />
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl text-red-600 flex items-center gap-3">
            <XCircle className="h-6 w-6 flex-shrink-0" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* ORDER HELP INFO */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-3xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                Order Status Guide
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock size={12} /> CONFIRMED
                  </span>
                  <span className="text-gray-600">Order is being prepared</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Truck size={12} /> SHIPPED
                  </span>
                  <span className="text-gray-600">On the way to you</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle size={12} /> DELIVERED
                  </span>
                  <span className="text-gray-600">Successfully delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <XCircle size={12} /> CANCELLED
                  </span>
                  <span className="text-gray-600">Order was cancelled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="bg-white p-6 rounded-2xl mb-8 shadow-lg border-2 border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID..."
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-semibold text-gray-700 transition-all cursor-pointer"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={fetchOrders}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Refresh
            </button>
          </div>
        </div>

        {/* ORDERS LIST OR EMPTY STATE */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl shadow-lg border-2 border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-gray-400" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery || filter !== "all"
                ? "No Orders Found"
                : "No Orders Yet"}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start shopping to see your orders here"}
            </p>
            {!searchQuery && filter === "all" && (
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/orders/${order.id}`} className="block group">
                  {/* HEADER */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-black text-lg text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar size={14} />
                        Placed on {order.estimatedelivery}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-2 text-xs font-bold rounded-xl flex gap-2 items-center ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.rawStatus}
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gray-100 my-4"></div>

                  {/* ORDER DETAILS */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Package className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">
                          Items
                        </p>
                        <p className="font-bold text-gray-900">
                          {order.items} Products
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">
                          Total
                        </p>
                        <p className="font-black text-gray-900 text-lg">
                          ₹{order.total}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-semibold uppercase">
                          Delivery
                        </p>
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {order.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* CANCEL BUTTON */}
                {canCancelOrder(order) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={(e) => openCancelModal(e, order)}
                      className="w-full md:w-auto bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-all duration-300 border-2 border-red-200 hover:border-red-300 flex items-center justify-center gap-2"
                    >
                      <XCircle className="h-5 w-5" />
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ADDITIONAL HELP SECTION */}
        {orders.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Not satisfied? Return any item within 7 days for a full refund,
                no questions asked.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white fill-current" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Rate Your Order
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Share your experience and help us serve you better. Your
                feedback matters!
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Rewards Program
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Earn points on every order and redeem them for exclusive
                discounts and offers.
              </p>
            </div>
          </div>
        )}

        {/* SUPPORT BANNER */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Headphones className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Need Help?</h3>
                <p className="text-gray-300">
                  Our support team is available 24/7
                </p>
              </div>
            </div>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* CANCEL ORDER MODAL */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-t-3xl text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black">Cancel Order</h3>
                </div>
                {!cancellingOrder && (
                  <button
                    onClick={closeCancelModal}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 text-lg mb-4">
                Are you sure you want to cancel this order?
              </p>

              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-semibold">
                    Order ID:
                  </span>
                  <span className="font-bold text-gray-900">
                    #{selectedOrder.id}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-semibold">
                    Items:
                  </span>
                  <span className="font-bold text-gray-900">
                    {selectedOrder.items} Products
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-semibold">
                    Total:
                  </span>
                  <span className="font-black text-gray-900 text-lg">
                    ₹{selectedOrder.total}
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Once cancelled, this action cannot be undone. A refund will
                    be processed within 5-7 business days.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeCancelModal}
                  disabled={cancellingOrder}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={cancellingOrder}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3.5 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {cancellingOrder ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      Cancel Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;