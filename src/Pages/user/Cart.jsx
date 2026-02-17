import React, { useEffect, useState } from "react";
import cartAPI from "../../api/cart.api";
import apiClient from "../../api/axios"; // ✅ important
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Truck,
  Shield,
  Gift,
  Tag,
  ArrowRight,
  Heart,
  Package,
  Sparkles,
  Clock,
  BadgePercent,
  Star,
  TrendingDown,
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTip, setSelectedTip] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [showCoupon, setShowCoupon] = useState(false);
  const navigate = useNavigate();

  const tipOptions = [0, 10, 20, 30, 50];

  /* ================= FETCH CART ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchCart();
  }, []);


  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await cartAPI.getCart();
      const itemsData = res?.items || res || [];

      // 🔥 Fetch product details using productId
      const items = await Promise.all(
        itemsData.map(async (ci) => {
          try {
            const productRes = await apiClient.get(
              `/products/${ci.productId}`
            );

            const product = productRes.data;

            // ✅ Get first image from images array
            let imageUrl = "/placeholder.png";

            if (product?.images?.length > 0) {
              imageUrl = product.images[0].imageUrl;
            }

            return {
              productId: ci.productId,
              name: product?.name || ci.productName,
              image: imageUrl,
              category: product?.categoryId || "",
              price: Number(product?.price || ci.price),
              quantity: Number(ci.quantity),
            };
          } catch (err) {
            console.error("Product fetch failed:", err);

            return {
              productId: ci.productId,
              name: ci.productName,
              image: "/placeholder.png",
              category: "",
              price: Number(ci.price),
              quantity: Number(ci.quantity),
            };
          }
        })
      );

      setCartItems(items);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  /* ================= REMOVE ================= */
  const removeItem = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      setCartItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error(err);
      alert("Remove failed");
    }
  };


  /* ================= UPDATE QTY ================= */
  const updateQuantity = async (productId, qty) => {
    if (qty < 0) return;

    // ✅ If quantity becomes 0 → remove item
    if (qty === 0) {
      await removeItem(productId);
      return;
    }

    const prev = [...cartItems];

    // Optimistic update
    setCartItems((items) =>
      items.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i
      )
    );

    try {
      await cartAPI.updateQuantity(productId, qty);
    } catch (err) {
      console.error(err);
      setCartItems(prev);
    }
  };


  /* ================= PRICE CALC ================= */
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const deliveryFee = totalPrice > 0 && totalPrice < 200 ? 25 : 0;
  const handlingFee = totalPrice > 0 ? 5 : 0;
  const savings = 50;
  const grandTotal = totalPrice + deliveryFee + handlingFee + selectedTip;


  /* ================= LOADING ================= */
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
            <ShoppingCart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600" size={28} />
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="text-red-500" size={32} />
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart size={64} className="text-slate-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-2xl">0</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-slate-500 mb-8">
            Looks like you haven't made your choice yet. Start exploring!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Package size={20} />
            Browse Products
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">

      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-emerald-600" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">My Cart</h1>
                <p className="text-sm text-slate-500">{cartItems.length} items</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <Shield size={18} />
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Truck size={18} />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Savings Banner */}
        <div className="mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl p-1 shadow-lg">
          <div className="bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">Yay! You're saving ₹{savings}</p>
                <p className="text-sm text-slate-600">Great deal on your order today!</p>
              </div>
            </div>
            <BadgePercent className="text-orange-500" size={32} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ================= LEFT SECTION ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Progress */}
            {totalPrice < 200 && totalPrice > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-md border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="text-blue-600" size={20} />
                    <span className="font-semibold text-slate-700">
                      Almost there for FREE delivery!
                    </span>
                  </div>
                  <span className="text-blue-600 font-bold">
                    ₹{200 - totalPrice} to go
                  </span>
                </div>
                <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.min((totalPrice / 200) * 100, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-5">
                    <div className="flex gap-5">

                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.target.src = "/placeholder.png";
                          }}
                        />
                        {item.category && (
                          <div className="absolute -top-2 -left-2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                            {item.category}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-slate-800 text-xl mb-2 leading-tight">
                            {item.name}
                          </h3>

                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl font-bold text-emerald-600">
                              ₹{item.price}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 line-through text-sm">
                                ₹{Math.round(item.price * 1.25)}
                              </span>
                              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                                <TrendingDown size={12} />
                                20% OFF
                              </div>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                              />
                            ))}
                            <span className="text-xs text-slate-500 ml-1">(4.0)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-10 h-10 bg-white rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center shadow-sm"
                            >
                              <Minus size={18} className="text-emerald-600" />
                            </button>


                            <div className="w-14 text-center">
                              <span className="font-bold text-slate-800 text-lg">{item.quantity}</span>
                            </div>

                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-10 h-10 bg-white rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center shadow-sm"
                            >
                              <Plus size={18} className="text-emerald-600" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase tracking-wide">Subtotal</p>
                            <p className="text-2xl font-bold text-slate-800">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <button className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors group">
                        <Heart size={16} className="group-hover:fill-emerald-600" />
                        <span className="text-sm font-medium">Save for Later</span>
                      </button>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors group"
                      >
                        <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Info Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Lightning Fast Delivery</h3>
                  <p className="text-blue-100">Your order will arrive within 30-45 minutes</p>
                  <div className="flex items-center gap-2 mt-3 text-sm bg-white/20 rounded-lg px-3 py-2 w-fit">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Express delivery available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: CHECKOUT SECTION ================= */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">

              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Package size={22} />
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* Price Breakdown */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-slate-700">
                    <span>Items ({cartItems.length})</span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-slate-700">
                    <div className="flex items-center gap-1">
                      <span>Delivery</span>
                      {deliveryFee === 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-1">
                          FREE
                        </span>
                      )}
                    </div>
                    <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : "font-semibold"}>
                      {deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-700">
                    <span>Handling</span>
                    <span className="font-semibold">₹{handlingFee}</span>
                  </div>

                  <div className="flex justify-between text-green-600 font-semibold bg-green-50 -mx-6 px-6 py-2">
                    <span className="flex items-center gap-1">
                      <TrendingDown size={16} />
                      Total Savings
                    </span>
                    <span>-₹{savings}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 mb-5">
                  {/* Coupon Code */}
                  <button
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="w-full flex items-center justify-between text-emerald-600 font-semibold mb-3 hover:text-emerald-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Tag size={18} />
                      Apply Coupon Code
                    </span>
                    <span className="text-sm">{showCoupon ? "−" : "+"}</span>
                  </button>

                  {showCoupon && (
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <button className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Tip Section */}
                <div className="border-t border-slate-200 pt-4 mb-5">
                  <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Gift size={18} className="text-emerald-600" />
                    Tip Your Delivery Partner
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {tipOptions.map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setSelectedTip(tip)}
                        className={`py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ${selectedTip === tip
                            ? "bg-emerald-600 text-white shadow-lg scale-110"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                      >
                        ₹{tip}
                      </button>
                    ))}
                  </div>
                  {selectedTip > 0 && (
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <span>💚</span> Thanks for your kindness!
                      </span>
                      <span className="font-semibold">₹{selectedTip}</span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="border-t-2 border-slate-200 pt-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 font-semibold">Total Amount</span>
                    <span className="text-3xl font-bold text-slate-800">₹{grandTotal}</span>
                  </div>
                  <p className="text-xs text-slate-500">Inclusive of all taxes</p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                {/* Security Badge */}
                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                  <Shield className="text-emerald-600" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Safe & Secure Payments</p>
                    <p className="text-xs text-slate-500">256-bit SSL encryption</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Easy returns within 7 days
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Quality guaranteed products
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    24/7 customer support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;