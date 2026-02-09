import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Wallet,
  ArrowLeft,
  Plus,
  Shield,
  Truck,
  Package,
  Clock,
  CheckCircle,
  Gift,
  Tag,
  Info,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

import checkoutAPI from "../../api/checkout.api";
import userAPI from "../../api/user.api";

const Checkout = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMode, setPaymentMode] = useState("COD");
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Static Information
  const deliveryInfo = {
    estimatedDays: "1-2",
    freeDeliveryThreshold: 500,
    standardCharge: 40,
    features: [
      "Safe and secure packaging",
      "Real-time order tracking",
      "Contact-free delivery available",
      "Easy returns within 7 days",
    ],
  };

  const paymentMethods = [
    {
      id: "COD",
      name: "Cash on Delivery",
      icon: Wallet,
      description: "Pay when you receive your order",
      badge: "Most Popular",
      processing: "No extra charges",
    },
    {
      id: "UPI",
      name: "UPI Payment",
      icon: CreditCard,
      description: "Pay via Google Pay, PhonePe, Paytm",
      badge: "Instant",
      processing: "Coming Soon",
      disabled: true,
    },
    {
      id: "CARD",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Rupay accepted",
      processing: "Coming Soon",
      disabled: true,
    },
  ];

  const trustBadges = [
    { icon: Shield, text: "100% Secure Checkout" },
    { icon: Truck, text: "Fast Delivery" },
    { icon: Package, text: "Quality Products" },
    { icon: CheckCircle, text: "Verified Seller" },
  ];

  const customerSupport = {
    phone: "+91 1800-123-4567",
    email: "support@yourstore.com",
    hours: "Mon-Sat: 9 AM - 8 PM",
  };

  /* ================= LOAD CART + PROFILE ================= */
  useEffect(() => {
    loadCheckout();
  }, []);

  const loadCheckout = async () => {
    try {
      const cartRes = await checkoutAPI.getCheckoutCart();
      const profileRes = await userAPI.getProfile();

      setCartItems(cartRes?.items || []);

      if (profileRes?.address) {
        setSelectedAddress(profileRes.address);
      } else if (profileRes?.addresses?.length) {
        setSelectedAddress(profileRes.addresses[0]);
      }
    } catch (err) {
      console.error("Checkout load failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PRICE ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > deliveryInfo.freeDeliveryThreshold
      ? 0
      : deliveryInfo.standardCharge;
  const totalAmount = subtotal + deliveryCharge;
  const savings = subtotal > deliveryInfo.freeDeliveryThreshold ? 40 : 0;

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please add delivery address");
      return;
    }

    setPlacingOrder(true);

    try {
      const orderBody = {
        items: cartItems.map((item) => ({
          name: item.productName || item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryCharge,
        paymentMode,
        estimatedDelivery: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      console.log("📦 ORDER BODY", orderBody);

      const createdOrder = await checkoutAPI.placeOrder(orderBody);

      const orderId =
        createdOrder?.orderId || createdOrder?.id || createdOrder?._id;

      await checkoutAPI.clearCart();

      navigate("/order-success", {
        state: { orderId, totalAmount },
      });
    } catch (err) {
      console.error("❌ Order failed", err);
      alert("Order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      {/* HEADER */}
      <div className="bg-white shadow-md sticky top-0 z-20 border-b-2 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Shield className="text-green-600" />
                  Secure Checkout
                </h1>
                <p className="text-sm text-gray-500">
                  Complete your order in {3 - step + 1} simple steps
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s ? <CheckCircle size={20} /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 mx-1 ${
                        step > s ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DELIVERY INFO BANNER */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="animate-bounce" size={18} />
              <span>Free delivery on orders above ₹{deliveryInfo.freeDeliveryThreshold}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Delivery in {deliveryInfo.estimatedDays} business days</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift size={18} />
              <span>Special packaging included</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1: ADDRESS */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapPin size={22} /> Delivery Address
                </h2>
              </div>
              {selectedAddress && (
                <CheckCircle className="text-green-200" size={24} />
              )}
            </div>

            <div className="p-6">
              {selectedAddress ? (
                <div className="space-y-4">
                  <div
                    onClick={() => navigate("/addresses")}
                    className="border-2 rounded-xl p-5 cursor-pointer hover:border-green-500 transition-all bg-green-50 border-green-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">
                        Delivery Location
                      </h3>
                      <button className="text-green-600 text-sm font-medium hover:underline">
                        Change
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedAddress.houseNo}, {selectedAddress.area},{" "}
                      {selectedAddress.city} - {selectedAddress.pinCode}
                    </p>
                  </div>

                  {step === 1 && (
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
                    >
                      Continue to Payment →
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/addresses")}
                  className="border-dashed border-3 border-green-500 p-6 w-full rounded-xl flex items-center justify-center gap-3 hover:bg-green-50 transition-all"
                >
                  <Plus className="text-green-600" size={24} />
                  <span className="font-semibold text-green-600 text-lg">
                    Add Delivery Address
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* STEP 2: PAYMENT */}
          {step >= 2 && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CreditCard size={22} /> Payment Method
                  </h2>
                </div>
                {paymentMode && <CheckCircle className="text-blue-200" size={24} />}
              </div>

              <div className="p-6 space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() =>
                        !method.disabled && setPaymentMode(method.id)
                      }
                      className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMode === method.id
                          ? "border-green-500 bg-green-50 shadow-md"
                          : method.disabled
                          ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                          : "border-gray-200 hover:border-green-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              paymentMode === method.id
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Icon size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-800">
                                {method.name}
                              </h3>
                              {method.badge && (
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                  {method.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {method.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {method.processing}
                            </p>
                          </div>
                        </div>
                        {paymentMode === method.id && (
                          <CheckCircle className="text-green-600" size={24} />
                        )}
                      </div>
                    </div>
                  );
                })}

                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Review Your Order →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & PLACE ORDER */}
          {step >= 3 && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package size={22} /> Review & Confirm
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Items Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Order Items ({cartItems.length})
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {cartItems.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm bg-white p-2 rounded"
                      >
                        <span className="text-gray-700">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <p className="text-xs text-gray-500 text-center">
                        +{cartItems.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Timeline */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Expected Delivery
                      </h3>
                      <p className="text-sm text-gray-600">
                        {deliveryInfo.estimatedDays} business days from order
                        placement
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {placingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Your Order...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle size={24} />
                      Place Order • ₹{totalAmount}
                    </span>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          )}

          {/* DELIVERY FEATURES */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="text-blue-600" />
              Why Shop With Us?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliveryInfo.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                >
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">Need Help?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span className="text-sm">{customerSupport.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-sm">{customerSupport.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} />
                <span className="text-sm">{customerSupport.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: ORDER SUMMARY */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Cart Items */}
              <div className="max-h-64 overflow-y-auto space-y-3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start pb-3 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-gray-800">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-1">
                    Delivery Charges
                    {deliveryCharge === 0 && (
                      <Tag className="text-green-600" size={16} />
                    )}
                  </span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Gift size={16} />
                      Delivery Savings
                    </span>
                    <span className="font-bold">-₹{savings}</span>
                  </div>
                )}

                {subtotal < deliveryInfo.freeDeliveryThreshold && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <p className="text-xs text-yellow-800">
                      Add ₹{deliveryInfo.freeDeliveryThreshold - subtotal} more
                      for FREE delivery!
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{totalAmount}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg"
                    >
                      <Icon className="text-green-600 mb-1" size={20} />
                      <span className="text-xs text-gray-700">
                        {badge.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;