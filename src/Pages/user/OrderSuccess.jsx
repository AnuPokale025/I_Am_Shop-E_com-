import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  ChevronRight,
} from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || "ORD-12345";

  return (
    <div className="min-h-screen bg-[#F5F7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0C831F] px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-[#0C831F]" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Order Placed Successfully 🎉
            </h1>
            <p className="text-green-100 text-sm mt-1">
              Your groceries are on the way
            </p>
          </div>

          {/* ETA Section */}
          <div className="px-6 py-5 border-b">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Delivery in</p>
                <p className="text-2xl font-bold text-gray-900">
                  10–15 mins ⚡
                </p>
              </div>
              <Clock className="w-10 h-10 text-[#0C831F]" />
            </div>
          </div>

          {/* Order Info */}
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-medium text-gray-800">{orderId}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Delivering to</p>
                <p className="font-medium text-gray-800">
                  Your saved address
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-5 space-y-3">
            <Link
              to="/orders"
              className="w-full flex items-center justify-between bg-[#0C831F] text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Track Order
              <ChevronRight className="w-5 h-5" />
            </Link>

            <Link
              to="/"
              className="w-full block text-center py-3 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
