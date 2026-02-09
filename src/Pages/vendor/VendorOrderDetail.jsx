import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  MapPin,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const VendorOrderDetail = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  /* ================= FETCH ORDER (NO ID) ================= */
  const fetchOrder = async () => {
    try {
      setLoading(true);

      const res = await vendorAPI.getVendorOrders();
      const orders = Array.isArray(res) ? res : res?.orders || [];

      const latestOrder = orders[0]; // latest order

      if (!latestOrder) {
        setOrder(null);
        return;
      }

      setOrder({
        ...latestOrder,
        items: Array.isArray(latestOrder.items) ? latestOrder.items : [],
      });
    } catch (err) {
      console.error("Fetch order error:", err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateOrderStatus = async (status) => {
    try {
      setUpdating(true);
      await vendorAPI.updateOrderStatus(order._id, status);
      setOrder((prev) => ({ ...prev, status }));
    } catch (err) {
      alert("Failed to update order");
    } finally {
      setUpdating(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600" />
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto h-10 w-10 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold">No Order Found</h2>
          <button
            onClick={() => navigate("/vendor/orders")}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="px-4 py-5 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-sm text-gray-500">
              Order ID: {order.orderId || order._id}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              Status: {order.status}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">

        {/* ITEMS */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-3">Items</h2>
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-2 text-sm"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* CUSTOMER INFO */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-3">Customer Details</h2>
          <p className="font-medium">{order.customer?.name}</p>
          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <Mail size={16} /> {order.customer?.email}
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <Phone size={16} /> {order.customer?.phone}
          </div>
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-3">Delivery Address</h2>
          <div className="flex gap-2 text-sm text-gray-600">
            <MapPin size={18} />
            <p>
              {order.deliveryAddress?.address},{" "}
              {order.deliveryAddress?.city},{" "}
              {order.deliveryAddress?.state} -{" "}
              {order.deliveryAddress?.zipCode}
            </p>
          </div>
        </div>

        {/* PAYMENT & SUMMARY */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-3">Payment Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Payment Mode</span>
            <span className="capitalize">{order.paymentMode}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee || 0}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span className="text-indigo-600">₹{order.total}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          {order.status === "processing" && (
            <>
              <button
                disabled={updating}
                onClick={() => updateOrderStatus("shipped")}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Mark as Shipped
              </button>
              <button
                disabled={updating}
                onClick={() => updateOrderStatus("cancelled")}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Cancel Order
              </button>
            </>
          )}

          {order.status === "shipped" && (
            <button
              disabled={updating}
              onClick={() => updateOrderStatus("completed")}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Mark as Delivered
            </button>
          )}

          {order.status === "completed" && (
            <div className="flex justify-center items-center gap-2 text-green-600">
              <CheckCircle /> Order Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOrderDetail;
