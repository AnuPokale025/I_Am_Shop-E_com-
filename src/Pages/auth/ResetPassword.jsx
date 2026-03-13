import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Shield } from "lucide-react";
import authAPI from "../../api/auth.api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await authAPI.resetPassword(formData);

      setMessage(
        response?.message ||
        "OTP Verified & Password Updated Successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err?.message ||
        err?.error ||
        "Invalid OTP or Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">

        {/* Top Badge */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-40"></div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Verify OTP & create new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* OTP */}
          <div className="relative">
            <Shield className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition tracking-widest"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Role Dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-gray-50"
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify & Reset Password"}
          </button>

          {/* Messages */}
          {message && (
            <p className="text-center mt-3 text-green-600 text-sm font-medium">
              {message}
            </p>
          )}

          {error && (
            <p className="text-center mt-3 text-red-600 text-sm font-medium">
              {error}
            </p>
          )}
        </form>

        {/* Bottom Link */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;