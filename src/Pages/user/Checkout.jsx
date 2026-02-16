// 🔥 FULL UPDATED CHECKOUT WITH FLEXIBLE PAYMENT

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

  /* ================= DELIVERY INFO ================= */

  const deliveryInfo = {
    estimatedDays: "1-2",
    freeDeliveryThreshold: 500,
    standardCharge: 40,
  };

  /* ================= FLEXIBLE PAYMENT METHODS ================= */

  const paymentMethods = [
    {
      id: "COD",
      name: "Cash on Delivery",
      icon: Wallet,
      description: "Pay when you receive your order",
      badge: "Popular",
    },
    {
      id: "UPI",
      name: "UPI Payment",
      icon: CreditCard,
      description: "Google Pay, PhonePe, Paytm",
      badge: "Instant",
    },
    {
      id: "CARD",
      name: "Credit / Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Rupay",
    },
    {
      id: "WALLET",
      name: "Wallet",
      icon: Wallet,
      description: "Use store wallet balance",
    },
    {
      id: "PARTIAL",
      name: "Partial Payment",
      icon: Wallet,
      description: "Pay ₹100 now, rest on delivery",
      badge: "Flexible",
    },
    {
      id: "EMI",
      name: "EMI Option",
      icon: CreditCard,
      description: "3 / 6 / 9 months",
      badge: "No Cost EMI",
    },
  ];

  /* ================= LOAD DATA ================= */

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

  /* ================= PRICE CALCULATION ================= */

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > deliveryInfo.freeDeliveryThreshold
      ? 0
      : deliveryInfo.standardCharge;

  const totalAmount = subtotal + deliveryCharge;

  const getPayableAmount = () => {
    if (paymentMode === "PARTIAL") return 100;
    return totalAmount;
  };

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
        totalAmount,
        paidAmount: getPayableAmount(),
        remainingAmount:
          paymentMode === "PARTIAL"
            ? totalAmount - 100
            : 0,
        estimatedDelivery: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      const createdOrder =
        await checkoutAPI.placeOrder(orderBody);

      const orderId =
        createdOrder?.orderId ||
        createdOrder?.id ||
        createdOrder?._id;

      navigate("/order-success", {
        state: { orderId, totalAmount },
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* HEADER */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold">
            Secure Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 mt-6 px-4">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              Delivery Address
            </h2>

            {selectedAddress ? (
              <div className="border p-4 rounded-lg bg-green-50">
                <p>
                  {selectedAddress.houseNo},{" "}
                  {selectedAddress.area},{" "}
                  {selectedAddress.city} -{" "}
                  {selectedAddress.pinCode}
                </p>
              </div>
            ) : (
              <button
                onClick={() => navigate("/addresses")}
                className="border-dashed border-2 p-4 w-full rounded-lg"
              >
                Add Address
              </button>
            )}

            <button
              onClick={() => setStep(2)}
              className="mt-4 bg-green-600 text-white w-full py-3 rounded-lg"
            >
              Continue
            </button>
          </div>

          {/* PAYMENT */}
          {step >= 2 && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() =>
                        setPaymentMode(method.id)
                      }
                      className={`border p-4 rounded-lg cursor-pointer ${
                        paymentMode === method.id
                          ? "border-black bg-gray-50"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <Icon size={20} />
                          <div>
                            <p className="font-medium">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {method.badge && (
                          <span className="text-xs bg-black text-white px-2 py-1 rounded">
                            {method.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONDITIONAL UI */}
              {paymentMode === "PARTIAL" && (
                <div className="mt-4 bg-yellow-50 p-3 rounded text-sm">
                  Pay ₹100 now and ₹{totalAmount - 100} on delivery.
                </div>
              )}

              {paymentMode === "EMI" && (
                <div className="mt-4 bg-blue-50 p-3 rounded text-sm">
                  3 Months – ₹{Math.ceil(totalAmount / 3)} <br />
                  6 Months – ₹{Math.ceil(totalAmount / 6)} <br />
                  9 Months – ₹{Math.ceil(totalAmount / 9)}
                </div>
              )}

              <button
                onClick={() => setStep(3)}
                className="mt-4 bg-blue-600 text-white w-full py-3 rounded-lg"
              >
                Continue
              </button>
            </div>
          )}

          {/* REVIEW */}
          {step >= 3 && (
            <div className="bg-white p-6 rounded-xl shadow">
              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className="bg-green-600 text-white w-full py-4 rounded-lg font-bold"
              >
                {placingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${getPayableAmount()}`}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0
                  ? "Free"
                  : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
