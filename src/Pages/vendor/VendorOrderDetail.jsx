import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package,
  MapPin,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
  Truck,
  XCircle,
  Clock,
  ShoppingBag,
  CreditCard,
  User,
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

/* ─── Status config ─────────────────────────────────────── */
const STATUS_CONFIG = {
  pending:    { label: "Pending",    color: "#F59E0B", bg: "#FEF3C7", Icon: Clock     },
  processing: { label: "Processing", color: "#6366F1", bg: "#EEF2FF", Icon: Package   },
  shipped:    { label: "Shipped",    color: "#3B82F6", bg: "#EFF6FF", Icon: Truck     },
  completed:  { label: "Delivered",  color: "#10B981", bg: "#ECFDF5", Icon: CheckCircle },
  cancelled:  { label: "Cancelled",  color: "#EF4444", bg: "#FEF2F2", Icon: XCircle   },
};

/* ─── Step tracker ──────────────────────────────────────── */
const STEPS = ["processing", "shipped", "completed"];

const StatusTracker = ({ status }) => {
  const currentIdx = STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-0 w-full">
      {STEPS.map((step, idx) => {
        const done    = idx <= currentIdx;
        const active  = idx === currentIdx;
        const cfg     = STATUS_CONFIG[step];
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                style={{
                  background: done ? cfg.color : "#E5E7EB",
                  boxShadow: active ? `0 0 0 4px ${cfg.color}33` : "none",
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <cfg.Icon size={16} color={done ? "#fff" : "#9CA3AF"} />
              </div>
              <span
                style={{ color: done ? cfg.color : "#9CA3AF" }}
                className="text-[10px] font-semibold mt-1 tracking-wide uppercase"
              >
                {cfg.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                style={{ background: idx < currentIdx ? cfg.color : "#E5E7EB" }}
                className="h-0.5 flex-1 mx-1 mb-5 transition-all duration-300"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ─── Section card ──────────────────────────────────────── */
const Card = ({ icon: Icon, title, accent = "#6366F1", children }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div
      className="flex items-center gap-2 px-5 py-3"
      style={{ borderLeft: `4px solid ${accent}`, background: `${accent}08` }}
    >
      <Icon size={16} color={accent} />
      <h2 className="font-bold text-sm tracking-wide uppercase text-gray-700">{title}</h2>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

/* ─── Main component ────────────────────────────────────── */
const VendorOrderDetail = () => {
  const navigate         = useNavigate();
  const { id: orderId }  = useParams();          // ← FIX: read id from URL

  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  /* ── fetch by ID ─────────────────────────────────────── */
  const fetchOrder = async () => {
    try {
      setLoading(true);

      let data;
      if (orderId) {
        // FIXED: fetch specific order by its ID
        data = await vendorAPI.getOrderById(orderId);
      } else {
        // Fallback: grab latest order (original behaviour)
        const res    = await vendorAPI.getVendorOrders();
        const orders = Array.isArray(res) ? res : res?.orders || [];
        data = orders[0];
      }

      if (!data) { setOrder(null); return; }

      setOrder({
        ...data,
        items: Array.isArray(data.items) ? data.items : [],
      });
    } catch (err) {
      console.error("Fetch order error:", err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  /* ── update status ───────────────────────────────────── */
  const updateOrderStatus = async (status) => {
    try {
      setUpdating(true);
      await vendorAPI.updateOrderStatus(order._id, status);
      setOrder((prev) => ({ ...prev, status }));
    } catch {
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  /* ── loading ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading order details…</p>
      </div>
    );
  }

  /* ── not found ───────────────────────────────────────── */
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white rounded-3xl p-10 shadow-md max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Package size={28} className="text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Order Not Found</h2>
          <p className="text-sm text-gray-400 mt-2 mb-6">
            We couldn't find order{orderId ? ` #${orderId}` : ""}.
          </p>
          <button
            onClick={() => navigate("/vendor/orders")}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold w-full hover:bg-indigo-700 transition"
          >
            ← Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusCfg     = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.processing;
  const itemsTotal    = order.items.reduce((s, it) => s + it.price * it.quantity, 0);
  const displayId     = order.orderId || order._id;

  return (
    <div className="min-h-screen bg-gray-50 pb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-900 truncate">
              Order&nbsp;
              <span className="text-indigo-600">#{displayId.slice(-8).toUpperCase()}</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })
                : "Date unavailable"}
            </p>
          </div>

          {/* status pill */}
          <span
            className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex-shrink-0"
            style={{ color: statusCfg.color, background: statusCfg.bg }}
          >
            {statusCfg.label}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">

        {/* ── STATUS TRACKER ─────────────────────────── */}
        {["processing", "shipped", "completed"].includes(order.status) && (
          <div className="bg-white rounded-2xl px-5 pt-5 pb-4 shadow-sm border border-gray-100">
            <StatusTracker status={order.status} />
          </div>
        )}

        {/* ── ORDER ITEMS ────────────────────────────── */}
        <Card icon={ShoppingBag} title="Order Items" accent="#6366F1">
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {/* avatar */}
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-500 font-bold text-sm">
                    {(item.name || "?").charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="text-sm font-bold text-indigo-700 flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* ── CUSTOMER INFO ──────────────────────────── */}
        <Card icon={User} title="Customer Details" accent="#F59E0B">
          <div className="space-y-2">
            <p className="font-bold text-gray-800">{order.customer?.name || "—"}</p>
            {order.customer?.email && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-amber-400" />
                {order.customer.email}
              </div>
            )}
            {order.customer?.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={14} className="text-amber-400" />
                {order.customer.phone}
              </div>
            )}
          </div>
        </Card>

        {/* ── DELIVERY ADDRESS ───────────────────────── */}
        <Card icon={MapPin} title="Delivery Address" accent="#10B981">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-emerald-500" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {[
                order.deliveryAddress?.address,
                order.deliveryAddress?.city,
                order.deliveryAddress?.state,
                order.deliveryAddress?.zipCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </Card>

        {/* ── PAYMENT SUMMARY ────────────────────────── */}
        <Card icon={CreditCard} title="Payment Summary" accent="#8B5CF6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹{itemsTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Fee</span>
              <span>₹{(order.deliveryFee || 0).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Payment Mode</span>
              <span className="capitalize font-medium text-gray-700">{order.paymentMode || "—"}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-base">
              <span className="text-gray-800">Total</span>
              <span className="text-indigo-600">₹{(order.total ?? itemsTotal + (order.deliveryFee || 0)).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </Card>

        {/* ── ACTIONS ────────────────────────────────── */}
        <div className="space-y-3">
          {order.status === "processing" && (
            <>
              <button
                disabled={updating}
                onClick={() => updateOrderStatus("shipped")}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
              >
                <Truck size={16} />
                {updating ? "Updating…" : "Mark as Shipped"}
              </button>
              <button
                disabled={updating}
                onClick={() => updateOrderStatus("cancelled")}
                className="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-500 py-3 rounded-2xl font-semibold text-sm hover:bg-red-50 active:scale-95 transition disabled:opacity-60"
              >
                <XCircle size={16} />
                {updating ? "Updating…" : "Cancel Order"}
              </button>
            </>
          )}

          {order.status === "shipped" && (
            <button
              disabled={updating}
              onClick={() => updateOrderStatus("completed")}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-2xl font-semibold text-sm hover:bg-emerald-700 active:scale-95 transition disabled:opacity-60"
            >
              <CheckCircle size={16} />
              {updating ? "Updating…" : "Mark as Delivered"}
            </button>
          )}

          {order.status === "completed" && (
            <div className="flex items-center justify-center gap-2 py-3 bg-emerald-50 rounded-2xl text-emerald-600 font-semibold text-sm">
              <CheckCircle size={18} />
              Order Successfully Delivered
            </div>
          )}

          {order.status === "cancelled" && (
            <div className="flex items-center justify-center gap-2 py-3 bg-red-50 rounded-2xl text-red-500 font-semibold text-sm">
              <XCircle size={18} />
              This Order Was Cancelled
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VendorOrderDetail;