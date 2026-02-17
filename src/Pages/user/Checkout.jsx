import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, CreditCard, Wallet, ArrowLeft, Plus, Shield, Truck,
  Package, CheckCircle, Tag, ChevronRight, Home, Briefcase, X,
  Edit2, BadgeCheck, AlertCircle, ChevronDown, Navigation,
} from "lucide-react";
import checkoutAPI from "../../api/checkout.api";
import userAPI from "../../api/user.api";

/* ══════════════════════════════════════════
   STEP BAR
══════════════════════════════════════════ */
const StepBar = ({ step }) => {
  const steps = ["Address", "Payment", "Review"];
  return (
    <div className="flex items-center justify-center gap-0 mb-2">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${done ? "bg-blue-600 text-white" : active ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}>
                {done ? <CheckCircle size={18} /> : idx}
              </div>
              <span className={`text-xs mt-1 font-medium
                ${active ? "text-black" : done ? "text-blue-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-16 mb-5 mx-1 transition-all
                ${step > idx ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════════
   PRODUCT IMAGE HELPER
══════════════════════════════════════════ */
const getProductImage = (product) => {
  if (!product.images || product.images.length === 0) {
    return "/placeholder.png";
  }
  const primaryImage = product.images.find((img) => img.primary);
  return (
    primaryImage?.imageUrl ||
    product.images[0]?.imageUrl ||
    "/placeholder.png"
  );
};

/* ══════════════════════════════════════════
   BLINKIT-STYLE ADDRESS MODAL
   Fields: fullName, houseNo, area, landmark, pinCode, city
══════════════════════════════════════════ */
const AddressModal = ({ existing, onClose, onSave }) => {
  const [form, setForm] = useState(
    existing || {
      label: "Home",
      fullName: "",
      houseNo: "",
      area: "",
      landmark: "",
      pinCode: "",
      city: "",
    }
  );
  const [errors, setErrors] = useState({});
  const [pinLoading, setPinLoading] = useState(false);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  // Auto-fill city from PIN (mock)
  const handlePinChange = async (val) => {
    set("pinCode", val);
    if (val.length === 6) {
      setPinLoading(true);
      setTimeout(() => {
        const mockPinMap = { "400092": "Nagpur", "400001": "Mumbai", "110001": "New Delhi" };
        if (mockPinMap[val]) set("city", mockPinMap[val]);
        setPinLoading(false);
      }, 600);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.houseNo.trim()) e.houseNo = "House / Flat No. is required";
    if (!form.area.trim()) e.area = "Area / Street is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!/^\d{6}$/.test(form.pinCode)) e.pinCode = "Valid 6-digit PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addressTypes = [
    { id: "Home", icon: Home, color: "text-blue-600" },
    { id: "Work", icon: Briefcase, color: "text-purple-600" },
    { id: "Other", icon: MapPin, color: "text-orange-500" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="relative px-5 pt-5 pb-4 border-b">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">
                {existing ? "Edit Address" : "Add Delivery Address"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">We'll deliver right to your door 🚚</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-5">

          {/* ── Address Type ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Save as</p>
            <div className="flex gap-2">
              {addressTypes.map(({ id, icon: Icon, color }) => (
                <button key={id} onClick={() => set("label", id)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-bold transition-all
                    ${form.label === id
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"}`}>
                  <Icon size={18} className={form.label === id ? "text-blue-600" : color} />
                  {id}
                </button>
              ))}
            </div>
          </div>

          {/* ── PIN Code ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">PIN Code</p>
            <div className="relative">
              <input
                type="number"
                value={form.pinCode}
                onChange={(e) => handlePinChange(e.target.value)}
                placeholder="Enter 6-digit PIN"
                maxLength={6}
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition pr-24
                  ${errors.pinCode
                    ? "border-red-400 bg-red-50 focus:border-red-400"
                    : form.pinCode.length === 6
                      ? "border-blue-500 bg-blue-50 focus:border-blue-600"
                      : "border-gray-200 focus:border-blue-500 bg-white"}`}
              />
              {pinLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-blue-600 font-semibold">
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Detecting…
                </div>
              )}
              {!pinLoading && form.pinCode.length === 6 && !errors.pinCode && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600 font-bold">✓ Valid</span>
              )}
            </div>
            {errors.pinCode && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.pinCode}
              </p>
            )}
          </div>

          {/* ── City ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">City</p>
            <input
              type="text"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="City (auto-filled from PIN)"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition
                ${errors.city ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500 bg-white"}`}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.city}
              </p>
            )}
          </div>

          {/* ── House / Flat No ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              House / Flat / Floor No. <span className="text-red-400">*</span>
            </p>
            <input
              type="text"
              value={form.houseNo}
              onChange={(e) => set("houseNo", e.target.value)}
              placeholder="e.g. 302, Block B, 3rd Floor"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition
                ${errors.houseNo ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.houseNo && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.houseNo}
              </p>
            )}
          </div>

          {/* ── Area / Street ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Area / Street / Colony <span className="text-red-400">*</span>
            </p>
            <input
              type="text"
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
              placeholder="e.g. Mankapur, MG Road"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition
                ${errors.area ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.area && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.area}
              </p>
            )}
          </div>

          {/* ── Landmark ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Landmark <span className="text-gray-300 font-normal normal-case">(optional)</span>
            </p>
            <input
              type="text"
              value={form.landmark}
              onChange={(e) => set("landmark", e.target.value)}
              placeholder="e.g. Near City Mall, Opp. Police Station"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* ── Full Name ── */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </p>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Receiver's full name"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition
                ${errors.fullName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* ── Preview card ── */}
          {(form.houseNo || form.area || form.city) && (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address Preview</p>
              <p className="text-sm text-gray-700 leading-snug">
                {[form.houseNo, form.area, form.landmark && `Near ${form.landmark}`, form.city, form.pinCode].filter(Boolean).join(", ")}
              </p>
              {form.fullName && <p className="text-xs text-gray-500 mt-1">For: <span className="font-semibold">{form.fullName}</span></p>}
            </div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="px-5 py-4 border-t bg-white">
          <button
            onClick={() => { if (validate()) onSave(form); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-extrabold text-sm transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
            <Navigation size={16} />
            {existing ? "Update Address" : "Save & Deliver Here"}
          </button>
          <button onClick={onClose} className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 py-1 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN CHECKOUT
══════════════════════════════════════════ */
const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);
  const [paymentMode, setPaymentMode] = useState("COD");
  const [emiMonths, setEmiMonths] = useState(3);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const MOCK_COUPONS = { SAVE50: 50, FIRST100: 100, FLAT200: 200 };
  const deliveryInfo = { estimatedDays: "1-2", freeDeliveryThreshold: 500, standardCharge: 40 };

  const paymentMethods = [
    { id: "COD", name: "Cash on Delivery", icon: Wallet, description: "Pay when you receive your order", badge: "Popular" },
    { id: "UPI", name: "UPI Payment", icon: CreditCard, description: "Google Pay, PhonePe, Paytm & more", badge: "Instant" },
    { id: "CARD", name: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
    { id: "WALLET", name: "Store Wallet", icon: Wallet, description: "Use your wallet balance" },
    { id: "PARTIAL", name: "Partial Payment", icon: Wallet, description: "Pay ₹100 now, rest on delivery", badge: "Flexible" },
    { id: "EMI", name: "No Cost EMI", icon: CreditCard, description: "3 / 6 / 9 month options", badge: "0% Interest" },
  ];

  useEffect(() => { loadCheckout(); }, []);

  const loadCheckout = async () => {
    try {
      const cartRes = await checkoutAPI.getCheckoutCart();
      const profileRes = await userAPI.getProfile();
      setCartItems(cartRes?.items || []);
      const addrs = profileRes?.addresses || (profileRes?.address ? [profileRes.address] : []);
      setAddresses(addrs);
    } catch (err) {
      console.error("Checkout load failed", err);
    } finally { setLoading(false); }
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryCharge = subtotal > deliveryInfo.freeDeliveryThreshold ? 0 : deliveryInfo.standardCharge;
  const discount = appliedCoupon ? (MOCK_COUPONS[appliedCoupon] || 0) : 0;
  const totalAmount = subtotal + deliveryCharge - discount;

  const getPayableAmount = () => {
    if (paymentMode === "PARTIAL") return 100;
    if (paymentMode === "EMI") return Math.ceil(totalAmount / emiMonths);
    return totalAmount;
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (MOCK_COUPONS[code]) { setAppliedCoupon(code); setCouponError(""); }
    else { setCouponError("Invalid coupon code"); setAppliedCoupon(null); }
  };

  const handleSaveAddress = (addr) => {
    if (editingAddress !== null) {
      const updated = [...addresses];
      updated[editingAddress] = addr;
      setAddresses(updated);
      setSelectedAddressIdx(editingAddress);
    } else {
      setAddresses((prev) => [...prev, addr]);
      setSelectedAddressIdx(addresses.length);
    }
    setShowAddressModal(false);
    setEditingAddress(null);
  };

  const removeAddress = (idx) => {
    const updated = addresses.filter((_, i) => i !== idx);
    setAddresses(updated);
    if (selectedAddressIdx >= updated.length) setSelectedAddressIdx(Math.max(0, updated.length - 1));
  };

  const placeOrder = async () => {
    if (!addresses.length) { alert("Please add a delivery address"); return; }
    setPlacingOrder(true);
    try {
      const addr = addresses[selectedAddressIdx];
      const orderBody = {
        address: {
          fullName: addr.fullName,
          houseNo: addr.houseNo,
          area: addr.area,
          landmark: addr.landmark,
          pinCode: addr.pinCode,
          city: addr.city,
        },
        items: cartItems.map((item) => ({
          name: item.productName || item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryCharge, discount, paymentMode,
        emiMonths: paymentMode === "EMI" ? emiMonths : null,
        totalAmount,
        paidAmount: getPayableAmount(),
        remainingAmount: paymentMode === "PARTIAL" ? totalAmount - 100 : 0,
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      };
      const createdOrder = await checkoutAPI.placeOrder(orderBody);
      const orderId = createdOrder?.orderId || createdOrder?.id || createdOrder?._id;
      navigate("/order-success", { state: { orderId, totalAmount } });
    } catch (err) {
      alert(err?.response?.data?.message || "Order failed. Please try again.");
    } finally { setPlacingOrder(false); }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3 bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading checkout…</p>
      </div>
    );
  }

  const selectedAddress = addresses[selectedAddressIdx];
  const visibleAddresses = showAllAddresses ? addresses : addresses.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {showAddressModal && (
        <AddressModal
          existing={editingAddress !== null ? addresses[editingAddress] : null}
          onClose={() => { setShowAddressModal(false); setEditingAddress(null); }}
          onSave={handleSaveAddress}
        />
      )}

      {/* STICKY HEADER */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">Secure Checkout</h1>
            <p className="text-xs text-gray-400 flex items-center gap-1"><Shield size={10} /> SSL Encrypted & Safe</p>
          </div>
        </div>
        <div className="pb-3 pt-1"><StepBar step={step} /></div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 mt-6 px-4">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-5">

          {/* ─── STEP 1: ADDRESS ─── */}
          <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${step > 1 ? "ring-1 ring-blue-400" : ""}`}>
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                {step > 1 ? <BadgeCheck size={20} className="text-blue-600" /> : <MapPin size={20} />}
                <h2 className="font-bold text-base">Delivery Address</h2>
              </div>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-xs text-blue-600 font-semibold hover:underline">Change</button>
              )}
            </div>

            {step === 1 ? (
              <div className="p-5 space-y-4">
                {addresses.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Saved Addresses</p>
                    {visibleAddresses.map((addr, idx) => {
                      const isSelected = selectedAddressIdx === idx;
                      return (
                        <div key={idx} onClick={() => setSelectedAddressIdx(idx)}
                          className={`relative rounded-2xl border-2 cursor-pointer transition-all overflow-hidden group
                            ${isSelected
                              ? "border-blue-600 shadow-md shadow-blue-100"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}>
                          {isSelected && (
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700" />
                          )}
                          <div className="p-4 flex gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5
                              ${isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                              {addr.label === "Work" ? <Briefcase size={18} /> : addr.label === "Other" ? <MapPin size={18} /> : <Home size={18} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-extrabold uppercase tracking-wider
                                  ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
                                  {addr.label || "Home"}
                                </span>
                                {isSelected && (
                                  <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                                    ✓ Delivering here
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-bold text-gray-800">{addr.fullName}</p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                {addr.houseNo}, {addr.area}
                                {addr.landmark ? `, Near ${addr.landmark}` : ""}
                              </p>
                              <p className="text-xs text-gray-500">
                                {addr.city} – <span className="font-semibold">{addr.pinCode}</span>
                              </p>
                            </div>
                            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={(e) => { e.stopPropagation(); setEditingAddress(idx); setShowAddressModal(true); }}
                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition">
                                <Edit2 size={12} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeAddress(idx); }}
                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition">
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center gap-2">
                              <Truck size={12} className="text-blue-600" />
                              <span className="text-xs font-semibold text-blue-700">
                                Delivery in {deliveryInfo.estimatedDays} business days to this address
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {addresses.length > 2 && (
                      <button onClick={() => setShowAllAddresses((v) => !v)}
                        className="w-full text-sm text-blue-600 font-semibold py-2 flex items-center justify-center gap-1 hover:underline">
                        {showAllAddresses ? "Show Less" : `+${addresses.length - 2} more`}
                        <ChevronDown size={14} className={`transition-transform ${showAllAddresses ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
                  className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-4 flex items-center gap-3
                    hover:border-blue-500 hover:bg-blue-50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center
                    group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
                    <Plus size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-700 group-hover:text-blue-600 transition">Add New Address</p>
                    <p className="text-xs text-gray-400">Home, Work or any other location</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-blue-500 transition" />
                </button>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-800">
                      {subtotal > deliveryInfo.freeDeliveryThreshold
                        ? "🎉 Free delivery unlocked!"
                        : `Add ₹${deliveryInfo.freeDeliveryThreshold - subtotal} more for free delivery`}
                    </p>
                    <p className="text-xs text-blue-500">Estimated {deliveryInfo.estimatedDays} business days</p>
                  </div>
                </div>

                <button
                  onClick={() => { if (!addresses.length) { alert("Please add an address first"); return; } setStep(2); }}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-extrabold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                  Deliver Here <ChevronRight size={16} className="inline" />
                </button>
              </div>
            ) : (
              selectedAddress && (
                <div className="px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    {selectedAddress.label === "Work" ? <Briefcase size={16} /> : <Home size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-blue-600 uppercase">{selectedAddress.label || "Home"}</span>
                      <span className="font-semibold text-sm text-gray-800">{selectedAddress.fullName}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {selectedAddress.houseNo}, {selectedAddress.area}, {selectedAddress.city} – {selectedAddress.pinCode}
                    </p>
                  </div>
                  <CheckCircle size={16} className="text-blue-600 flex-shrink-0" />
                </div>
              )
            )}
          </div>

          {/* ─── STEP 2: PAYMENT ─── */}
          {step >= 2 && (
            <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${step > 2 ? "ring-1 ring-blue-400" : ""}`}>
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center gap-2">
                  {step > 2 ? <BadgeCheck size={20} className="text-blue-600" /> : <CreditCard size={20} />}
                  <h2 className="font-bold text-base">Payment Method</h2>
                </div>
                {step > 2 && <button onClick={() => setStep(2)} className="text-xs text-blue-600 font-semibold hover:underline">Change</button>}
              </div>

              {step === 2 ? (
                <div className="p-6 space-y-4">
                  <div className="space-y-2.5">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = paymentMode === method.id;
                      return (
                        <div key={method.id} onClick={() => setPaymentMode(method.id)}
                          className={`border-2 p-4 rounded-xl cursor-pointer transition-all
                            ${isSelected ? "border-blue-600 bg-blue-50 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                              ${isSelected ? "border-blue-600" : "border-gray-300"}`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                            </div>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                              ${isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm">{method.name}</p>
                              <p className="text-xs text-gray-500 truncate">{method.description}</p>
                            </div>
                            {method.badge && (
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0
                                ${method.badge === "Popular" ? "bg-orange-100 text-orange-600"
                                  : method.badge === "Instant" ? "bg-blue-100 text-blue-600"
                                    : method.badge === "Flexible" ? "bg-purple-100 text-purple-600"
                                      : "bg-blue-100 text-blue-600"}`}>
                                {method.badge}
                              </span>
                            )}
                          </div>
                          {isSelected && method.id === "EMI" && (
                            <div className="mt-3 ml-16 grid grid-cols-3 gap-2" onClick={(e) => e.stopPropagation()}>
                              {[3, 6, 9].map((m) => (
                                <button key={m} onClick={() => setEmiMonths(m)}
                                  className={`p-2 rounded-lg text-xs font-bold border transition
                                    ${emiMonths === m ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:border-blue-400"}`}>
                                  {m} months<br /><span className="font-normal">₹{Math.ceil(totalAmount / m)}/mo</span>
                                </button>
                              ))}
                            </div>
                          )}
                          {isSelected && method.id === "PARTIAL" && (
                            <div className="mt-3 ml-16 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs">
                              <p className="font-semibold text-yellow-800">Pay ₹100 now · ₹{totalAmount - 100} on delivery</p>
                              <p className="text-yellow-600 mt-0.5">Remaining collected at your doorstep.</p>
                            </div>
                          )}
                          {isSelected && method.id === "UPI" && (
                            <div className="mt-3 ml-16" onClick={(e) => e.stopPropagation()}>
                              <input type="text" placeholder="Enter UPI ID (e.g. name@upi)"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                          )}
                          {isSelected && method.id === "CARD" && (
                            <div className="mt-3 ml-16 space-y-2" onClick={(e) => e.stopPropagation()}>
                              <input type="text" placeholder="Card number" maxLength={19}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
                              <div className="flex gap-2">
                                <input type="text" placeholder="MM / YY" maxLength={5}
                                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
                                <input type="password" placeholder="CVV" maxLength={4}
                                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                    <Shield size={13} className="flex-shrink-0 text-blue-600" />
                    Your payment info is 256-bit SSL encrypted and completely secure.
                  </div>
                  <button onClick={() => setStep(3)}
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition">
                    Review Order <ChevronRight size={16} className="inline" />
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 flex items-center gap-2">
                  {(() => {
                    const m = paymentMethods.find((p) => p.id === paymentMode);
                    const Icon = m?.icon || CreditCard;
                    return (
                      <>
                        <Icon size={16} />
                        <span className="font-semibold text-sm">{m?.name}</span>
                        {paymentMode === "EMI" && (
                          <span className="text-xs text-gray-500">· {emiMonths} mo @ ₹{Math.ceil(totalAmount / emiMonths)}/mo</span>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* ─── STEP 3: REVIEW ─── */}
          {step >= 3 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b bg-gray-50">
                <Package size={20} /><h2 className="font-bold text-base">Review Items</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      {/* ✅ FIXED: use item.images?.length instead of item.image */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.images?.length > 0 ? (
                          <img
                            src={getProductImage(item)}
                            alt={item.productName || item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.png";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package size={18} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.productName || item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <button onClick={placeOrder} disabled={placingOrder}
                    className={`w-full py-4 rounded-xl font-bold text-base transition flex items-center justify-center gap-2
                      ${placingOrder ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"}`}>
                    {placingOrder
                      ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Placing Order…</>
                      : <><CheckCircle size={20} />Place Order · ₹{getPayableAmount()}{paymentMode === "EMI" && <span className="text-xs font-normal opacity-80">/{emiMonths} months</span>}</>}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-2">
                    By placing your order, you agree to our Terms &amp; Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-36">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="font-bold text-base">Order Summary</h2>
              <p className="text-xs text-gray-400">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">{item.productName || item.name} × {item.quantity}</span>
                    <span className="font-medium flex-shrink-0">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-blue-600 font-semibold" : ""}>
                    {deliveryCharge === 0 ? "Free 🎉" : `₹${deliveryCharge}`}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-blue-600 font-semibold">
                    <span className="flex items-center gap-1"><Tag size={12} /> Coupon ({appliedCoupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base border-t pt-2">
                  <span>Total</span><span>₹{totalAmount}</span>
                </div>
                {paymentMode === "PARTIAL" && <div className="flex justify-between text-purple-600 text-xs font-semibold"><span>Pay Now</span><span>₹100</span></div>}
                {paymentMode === "EMI" && <div className="flex justify-between text-blue-600 text-xs font-semibold"><span>Per Month ({emiMonths} mo)</span><span>₹{Math.ceil(totalAmount / emiMonths)}</span></div>}
              </div>
              <div className="border-t pt-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Coupon Code</p>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-bold text-blue-700 flex items-center gap-1"><Tag size={13} /> {appliedCoupon} applied!</span>
                    <button onClick={() => { setAppliedCoupon(null); setCoupon(""); }} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input type="text" value={coupon}
                        onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); }}
                        placeholder="Enter code"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={applyCoupon} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Apply</button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                    <p className="text-xs text-gray-400 mt-1">Try: SAVE50, FIRST100, FLAT200</p>
                  </div>
                )}
              </div>
              <div className="border-t pt-3 grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
                <div className="flex flex-col items-center gap-1"><Shield size={16} className="text-blue-600" /><span>Secure Pay</span></div>
                <div className="flex flex-col items-center gap-1"><Truck size={16} className="text-blue-500" /><span>Fast Delivery</span></div>
                <div className="flex flex-col items-center gap-1"><Package size={16} className="text-orange-500" /><span>Easy Return</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;