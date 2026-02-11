import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cartAPI from "../../api/cart.api";
import {
  Package,
  Truck,
  MapPin,
  CreditCard,
  ArrowLeft,
  Phone,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
} from "lucide-react";

import userAPI from "../../api/user.api";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [id]);


  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await userAPI.getProfile();
      setProfile(res?.data || res);
    } catch (err) {
      console.error("❌ Profile fetch failed", err);
    }
  };

  /* ================= DEFAULT ADDRESS ================= */
  const defaultAddress = profile?.address || profile?.add;

  const addressText = (() => {
    if (!defaultAddress) return "Add your delivery address";
    if (typeof defaultAddress === "string") return defaultAddress;

    const parts = [];
    if (defaultAddress.houseNo) parts.push(defaultAddress.houseNo);
    if (defaultAddress.area) parts.push(defaultAddress.area);
    if (defaultAddress.city) parts.push(defaultAddress.city);
    if (defaultAddress.pinCode || defaultAddress.pincode)
      parts.push(defaultAddress.pinCode || defaultAddress.pincode);

    return parts.join(", ");
  })();
  /* ================= FETCH ORDER ================= */
  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await userAPI.getOrders();

      // 🔁 Normalize backend → UI
      const normalizedOrder = {
        id: data.id || data.orderId,
        status: (data.status || "processing").toLowerCase(),
        date: new Date(data.createdAt).toLocaleDateString(),
        items: data.items || [],
        total: data.totalAmount,
        deliveryFee: data.deliveryCharge,
        paymentMethod: data.paymentMode?.toLowerCase(),
        deliveryAddress: {
          name: data.deliveryAddress?.fullName || "Customer",
          address: `${data.deliveryAddress?.houseNo}, ${data.deliveryAddress?.area}`,
          city: data.deliveryAddress?.city,
          state: "",
          zipCode: data.deliveryAddress?.pinCode,
          phone: data.deliveryAddress?.phone || "",
        },
      };

      setOrder(normalizedOrder);
    } catch (err) {
      console.error("Order fetch failed", err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() =>{
      fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await cartAPI.getCart();

      // backend usually returns { items: [] }
      const items = (res?.items || []).map((ci) => ({
        productId: ci.productId,
        name: ci.productName || ci.name,
        image: ci.image,
        category: ci.category,
        price: Number(ci.price),
        quantity: Number(ci.quantity),
      }));

      setCartItems(items);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };
//===================prize===================
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 500 ? 0 : 49.99;
  const totalAmount = subtotal + deliveryCharge;
  const totalPrice = cartItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );
  const deliveryFee = totalPrice > 0 && totalPrice < 200 ? 25 : 0;
  const handlingFee = totalPrice > 0 ? 5 : 0;
  const grandTotal = totalPrice + deliveryFee + handlingFee;

  /* ================= HELPERS ================= */
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5" />;
      case "processing":
        return <Clock className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "cancelled":
        return <XCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl text-center">
          <XCircle className="mx-auto text-red-500" size={48} />
          <p className="mt-4 text-gray-700">{error || "Order not found"}</p>
          <button
            onClick={() => navigate("/orders")}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-xl"
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
      {/* Header */}
      <div className="bg-white sticky top-0 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusIcon(order.status)}
            {order.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 rounded-xl flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>

                {/* <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div> */}
              </div>

             
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="space-y-4">

          {/* DEFAULT ADDRESS (CLICKABLE) */}
          <div

            className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm cursor-pointer border hover:border-green-500"
          >
            <MapPin className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="text-xs text-gray-500">Default Delivery Address</p>
              <p className="font-medium text-gray-900">{addressText}</p>
              <p className="text-xs text-green-600 mt-1">
              
              </p>
            </div>
          </div>
          {order.deliveryAddress.phone && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Phone size={14} /> {order.deliveryAddress.phone}
            </div>
          )}
        </div>

        {/* PAYMENT */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-bold mb-3">Payment</h2>
          <div className="flex items-center gap-2">
            <CreditCard />
            <span>
              {order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>
          </div>
        </div>

        {/* BILL */}
        <div className="bg-white p-5 rounded-xl h-fit">
          <h2 className="font-bold mb-4">Bill Details</h2>

          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Handling</span>
            <span>₹{handlingFee}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl border sticky top-24">
          <h2 className="font-bold mb-4">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="mt-4 text-sm text-gray-600 flex gap-2">
            <Shield className="text-green-500" /> Secure checkout
          </div>
        </div>
      </div>
    </div>

  );
};

export default OrderDetail;
