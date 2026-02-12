import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  ChevronRight,
  Gift,
  Star,
  Truck,
  Shield,
  Phone,
  Bell,
  Tag,
  Percent,
  Award,
  Heart,
  Share2,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || "ORD-12345";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100">
          {/* Header with Animation */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-6 py-10 text-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={3} />
              </div>
              
              <h1 className="text-3xl font-black text-white mb-2">
                Order Placed Successfully! 🎉
              </h1>
              <p className="text-green-100 text-lg font-semibold">
                Your groceries are being prepared
              </p>

              {/* Confetti Icons */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span className="text-white font-bold text-sm">Thank you for your order!</span>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>

          {/* ETA Section - Enhanced */}
          <div className="px-6 py-6 bg-gradient-to-br from-green-50 to-emerald-50 border-b-2 border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Estimated Delivery</p>
                <p className="text-3xl font-black text-gray-900 flex items-center gap-2">
                  10–15 mins
                  <span className="text-2xl">⚡</span>
                </p>
                <p className="text-xs text-green-600 font-semibold mt-1">Lightning fast delivery!</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="px-6 py-6 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-semibold uppercase">Order ID</p>
                <p className="font-bold text-gray-900 text-lg">{orderId}</p>
                <p className="text-xs text-gray-600 mt-1">Track your order anytime</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-semibold uppercase">Delivering to</p>
                <p className="font-bold text-gray-900">Your saved address</p>
                <p className="text-xs text-gray-600 mt-1">Real-time tracking available</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 space-y-3 bg-gray-50">
            <Link
              to="/orders"
              className="w-full flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Track Order
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-100 hover:border-green-500 transition-all duration-300"
            >
              <Package className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-black text-gray-900">What Happens Next?</h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Order Confirmation</h3>
                <p className="text-sm text-gray-600">We're preparing your items with care</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Quality Check</h3>
                <p className="text-sm text-gray-600">Every item is verified for freshness</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">On the Way</h3>
                <p className="text-sm text-gray-600">Track in real-time as we deliver</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Delivered!</h3>
                <p className="text-sm text-gray-600">Fresh groceries at your doorstep</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-8 h-8" />
            <h2 className="text-xl font-black">You're Earning Rewards!</h2>
          </div>
          <p className="text-purple-100 mb-4">
            This order qualifies for cashback and loyalty points. Keep shopping to unlock exclusive benefits!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center">
              <p className="text-2xl font-black">5%</p>
              <p className="text-xs text-purple-100">Cashback</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center">
              <p className="text-2xl font-black">50</p>
              <p className="text-xs text-purple-100">Points</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center">
              <p className="text-2xl font-black">1x</p>
              <p className="text-xs text-purple-100">Multiplier</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">100% Secure</h3>
                <p className="text-sm text-gray-600">Your payment & data are protected</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-sm text-gray-600">We're here to help anytime</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Quality Assured</h3>
                <p className="text-sm text-gray-600">Fresh or full refund guarantee</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-green-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Percent className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Best Prices</h3>
                <p className="text-sm text-gray-600">Guaranteed lowest prices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-green-50 hover:border-green-500 border-2 border-transparent transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">Download Invoice</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:border-blue-500 border-2 border-transparent transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">Email Receipt</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-purple-50 hover:border-purple-500 border-2 border-transparent transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">Share Order</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 hover:border-pink-500 border-2 border-transparent transition-all duration-300 group">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">Add to Favorites</span>
            </button>
          </div>
        </div> */}

        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
              <Tag className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black mb-2">Special Offer Just for You!</h3>
              <p className="text-yellow-100 mb-3">
                Get 20% OFF on your next order above ₹500. Use code: <span className="font-black">THANKS20</span>
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold">Valid for 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Banner */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-9 h-9 fill-current" />
            </div>
            <h3 className="text-2xl font-black mb-2">Love Our Service?</h3>
            <p className="text-purple-100 mb-4 max-w-md mx-auto">
              Refer friends and earn ₹100 for each successful referral. They get ₹100 too!
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-2xl font-bold hover:bg-purple-50 transition-all duration-300 shadow-lg">
              Invite Friends Now
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all duration-300 shadow-lg">
              Chat with Us
            </button>
            <button className="border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 hover:border-green-500 transition-all duration-300">
              Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;