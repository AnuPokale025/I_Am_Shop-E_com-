import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;
    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/auth/reset-password", {
        token,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS SCREEN ================= */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3fdf7]">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Password Updated</h2>
          <p className="text-gray-600">
            Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen flex bg-[#f3fdf7]">
      {/* ===== Sidebar ===== */}
      <div className="hidden md:flex w-1/3 bg-green-600 text-white p-10 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">Blinkit</h1>
          <p className="text-green-100">
            Groceries delivered in minutes ⚡
          </p>

          <ul className="mt-10 space-y-4 text-green-100">
            <li>✔ Secure account</li>
            <li>✔ Fast delivery</li>
            <li>✔ Trusted by millions</li>
          </ul>
        </div>

        <p className="text-sm text-green-200">
          © 2026 Blinkit Clone
        </p>
      </div>

      {/* ===== Right Content ===== */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            Reset Password
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Create a new password for your account
          </p>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
