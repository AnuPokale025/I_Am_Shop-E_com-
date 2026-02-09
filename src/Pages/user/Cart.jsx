import React, { useEffect, useState } from "react";
import cartAPI from "../../api/cart.api";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Gift, 
  Truck, 
  Shield, 
  Clock,
  Heart,
  Star,
  Info,
  Tag,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTip, setSelectedTip] = useState(0);
  const navigate = useNavigate();

  const tipOptions = [0, 10, 20, 30, 50];

  /* ================= FETCH CART ================= */
  useEffect(() => {
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

  /* ================= REMOVE ================= */
  const removeItem = async (productId) => {
    try {
      const res = await cartAPI.removeFromCart(productId);
      setCartItems(res.items || []);
    } catch (err) {
      console.error(err);
      alert("Remove failed");
    }
  };

  /* ================= UPDATE QTY ================= */
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;

    const prev = [...cartItems];
    setCartItems((items) =>
      items.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i
      )
    );

    try {
      await cartAPI.updateQuantity(productId, qty);
    } catch (err) {
      console.error(err);
      setCartItems(prev); // rollback
    }
  };

  /* ================= PRICE ================= */
  const totalPrice = cartItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );
  const deliveryFee = totalPrice > 0 && totalPrice < 200 ? 25 : 0;
  const handlingFee = totalPrice > 0 ? 5 : 0;
  const savings = cartItems.reduce((s, i) => s + (i.originalPrice ? (i.originalPrice - i.price) * i.quantity : 0), 0);
  const grandTotal = totalPrice + deliveryFee + handlingFee + selectedTip;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart... 🛒</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">😕</span>
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button 
            onClick={fetchCart}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty! 🛒</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet. Let's fix that! 🎉
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Start Shopping
          </button>
          
          {/* Suggested Categories */}
          <div className="mt-12 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Categories 🔥</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate("/categories/fruits")}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left"
              >
                <span className="text-2xl mb-2 block">🍎</span>
                <p className="font-semibold text-gray-900">Fresh Fruits</p>
              </button>
              <button 
                onClick={() => navigate("/categories/vegetables")}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left"
              >
                <span className="text-2xl mb-2 block">🥬</span>
                <p className="font-semibold text-gray-900">Vegetables</p>
              </button>
              <button 
                onClick={() => navigate("/categories/dairy")}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left"
              >
                <span className="text-2xl mb-2 block">🥛</span>
                <p className="font-semibold text-gray-900">Dairy</p>
              </button>
              <button 
                onClick={() => navigate("/categories/snacks")}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left"
              >
                <span className="text-2xl mb-2 block">🍿</span>
                <p className="font-semibold text-gray-900">Snacks</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            My Cart
            <span className="text-lg font-normal text-gray-500">({cartItems.length} items)</span>
          </h1>
          <p className="text-gray-600 mt-2">Review your items and checkout when you're ready! 🎯</p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Delivery in</p>
              <p className="font-bold text-sm text-gray-900">10 Minutes ⚡</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">100% Safe</p>
              <p className="font-bold text-sm text-gray-900">Payments 🔒</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Quality</p>
              <p className="font-bold text-sm text-gray-900">Guaranteed ✓</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Free Delivery</p>
              <p className="font-bold text-sm text-gray-900">Over ₹200 🎁</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🛍️</span> Cart Items
              </h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                      />
                      {item.discount && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {item.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">₹{item.originalPrice}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-green-50 hover:border-green-500 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          
                          <span className="font-bold text-gray-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center bg-green-600 border border-green-600 rounded-md hover:bg-green-700 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="self-start p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip Your Delivery Partner */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-orange-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💝</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    Tip Your Delivery Partner
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Your kindness means a lot! 100% of your tip will go directly to your delivery partner. ❤️
                  </p>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {tipOptions.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedTip(amount)}
                    className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                      selectedTip === amount
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {amount === 0 ? 'No Tip' : `₹${amount}`}
                  </button>
                ))}
              </div>
              
              {selectedTip > 0 && (
                <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-lg">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">
                    Thank you for your generosity! 🙏
                  </span>
                </div>
              )}
            </div>

            {/* Offers & Benefits */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200">
              <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                Special Offers & Benefits 🎉
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">
                    <strong>Free Delivery</strong> on orders above ₹200 🚚
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">
                    <strong>Quality Guarantee</strong> - 100% fresh or money back 🌟
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">
                    <strong>10-Min Delivery</strong> - Lightning fast service ⚡
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Cancellation Policy 📋
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Orders cannot be cancelled once packed for delivery. In case of unexpected delays, 
                    a refund will be provided, if applicable. We appreciate your understanding! 🙏
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BILL DETAILS */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
              <h2 className="font-bold text-xl text-gray-900 mb-5 flex items-center gap-2">
                <span>💰</span> Bill Details
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Items Total
                  </span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Delivery Fee
                  </span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE 🎉</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Handling Fee
                  </span>
                  <span className="font-semibold">₹{handlingFee}</span>
                </div>

                {selectedTip > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Partner Tip
                    </span>
                    <span className="font-semibold">₹{selectedTip}</span>
                  </div>
                )}

                {savings > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-2 font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      Total Savings
                    </span>
                    <span className="font-bold">₹{savings} 🎊</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-green-600">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {totalPrice < 200 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    Add ₹{200 - totalPrice} more to get FREE delivery! 🎁
                  </p>
                </div>
              )}

              {/* Payment Methods */}
              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">We accept:</p>
                <div className="flex gap-2 flex-wrap">
                  <div className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-700">
                    💳 Cards
                  </div>
                  <div className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-700">
                    📱 UPI
                  </div>
                  <div className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-700">
                    💵 Cash
                  </div>
                  <div className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-700">
                    🏦 Net Banking
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