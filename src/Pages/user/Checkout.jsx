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
  const savings =
    subtotal > deliveryInfo.freeDeliveryThreshold ? 40 : 0;

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    console.log(placingOrder);
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

      const createdOrder = await checkoutAPI.placeOrder(orderBody);
      const orderId =
        createdOrder?.orderId || createdOrder?.id || createdOrder?._id;

      navigate("/order-success", {
        state: { orderId, totalAmount },
      });
    } catch (err) {
      console.error("❌ Order failed", err);
      console.error("Order error details:", {
        status: err?.response?.status,
        data: err?.response?.data,
        message: err?.response?.data?.message,
      });
      alert(err?.response?.data?.message || "Order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-10">
      {/* HEADER */}
      <div className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              Secure Checkout
            </h1>
            <p className="text-sm text-gray-500">
              Complete your order in {3 - step + 1} simple steps
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto px-4 pb-4 flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    step > s ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* DELIVERY INFO BANNER */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Free delivery on orders above ₹{deliveryInfo.freeDeliveryThreshold}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Delivery in {deliveryInfo.estimatedDays} business days
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Special packaging included
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6 grid lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1: ADDRESS */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Delivery Address
              </h2>
              {selectedAddress && (
                <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
              )}
            </div>

            {selectedAddress ? (
              <div>
                <div
                  onClick={() => navigate("/addresses")}
                  className="border-2 rounded-xl p-5 cursor-pointer hover:border-green-500 transition-all bg-green-50 border-green-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-800">
                        Delivery Location
                      </span>
                    </div>
                    <button className="text-green-600 font-semibold hover:underline">
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
                <Plus className="w-6 h-6 text-green-600" />
                <span className="text-green-600 font-semibold text-lg">
                  Add Delivery Address
                </span>
              </button>
            )}
          </div>

          {/* STEP 2: PAYMENT */}
          {step >= 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Payment Method
                </h2>
                {paymentMode && (
                  <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                )}
              </div>

              <div className="space-y-3">
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
                      <div className="flex items-start gap-4">
                        <Icon className="w-6 h-6 text-gray-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">
                              {method.name}
                            </h3>
                            {method.badge && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {method.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {method.processing}
                          </p>
                        </div>
                        {paymentMode === method.id && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {step === 2 && (
                <button
                  onClick={() => setStep(3)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
                >
                  Review Your Order →
                </button>
              )}
            </div>
          )}

          {/* STEP 3: REVIEW & PLACE ORDER */}
          {step >= 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Review & Confirm
                </h2>
              </div>

              {/* Order Items Preview */}
              <div className="mb-6 bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({cartItems.length})
                </h3>
                <div className="space-y-2">
                  {cartItems.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm bg-white p-3 rounded-lg"
                    >
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <p className="text-sm text-gray-500 text-center pt-2">
                      +{cartItems.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="mb-6 bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Expected Delivery
                  </h3>
                  <p className="text-sm text-gray-600">
                    {deliveryInfo.estimatedDays} business days from order
                    placement
                  </p>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {placingOrder ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Placing Your Order...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Place Order • ₹{totalAmount}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          )}

          {/* DELIVERY FEATURES */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Why Shop With Us?
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {deliveryInfo.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Need Help?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>{customerSupport.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>{customerSupport.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>{customerSupport.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm pb-3 border-b"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center text-gray-700">
                <div className="flex items-center gap-2">
                  <span>Delivery Charges</span>
                  {deliveryCharge === 0 && (
                    <Gift className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <span
                  className={`font-semibold ${
                    deliveryCharge === 0 ? "text-green-600" : ""
                  }`}
                >
                  {deliveryCharge === 0 ? (
                    <span className="line-through text-gray-400 mr-2">
                      ₹{deliveryInfo.standardCharge}
                    </span>
                  ) : null}
                  {deliveryCharge === 0 ? (
                    "FREE"
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                  <span className="flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    Delivery Savings
                  </span>
                  <span className="font-semibold">-₹{savings}</span>
                </div>
              )}

              {subtotal < deliveryInfo.freeDeliveryThreshold && (
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-xs flex items-start gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Add ₹{deliveryInfo.freeDeliveryThreshold - subtotal} more
                    for FREE delivery!
                  </span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t-2">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Inclusive of all taxes
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-3">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <Icon className="w-4 h-4 text-green-600" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;