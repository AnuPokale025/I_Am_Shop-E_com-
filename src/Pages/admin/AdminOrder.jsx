import { useEffect, useState } from "react";
import {
  Package,
  User,
  Truck,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import adminAPI from "../../api/admin.api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getOrders();
      setOrders(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch {
      alert("Failed to update order status");
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "SHIPPED":
        return "bg-blue-100 text-blue-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          🧾 Orders
        </h1>
        <p className="text-sm text-gray-500">
          Manage and update customer orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-2xl p-5 shadow-sm border"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Order #{o.id}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <User size={14} className="mr-1" />
                    {o.userEmail}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-4" />

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Package size={16} />
                  Order Processing
                </div>

                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o.id, e.target.value)
                  }
                  className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
