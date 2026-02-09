import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS SCREEN ================= */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3fdf7] p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We’ve sent a password reset link to  
            <span className="block font-medium text-gray-900 mt-1">
              {email}
            </span>
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen flex bg-[#f3fdf7]">
      {/* ===== Left Branding (Desktop Only) ===== */}
      <div className="hidden md:flex w-1/3 bg-green-600 text-white p-10 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-3">I Am Shop</h1>
          <p className="text-green-100">
            Groceries delivered in minutes ⚡
          </p>

          <ul className="mt-10 space-y-3 text-green-100 text-sm">
            <li>✔ Secure account recovery</li>
            <li>✔ Trusted by millions</li>
            <li>✔ Fast & simple</li>
          </ul>
        </div>

        <p className="text-xs text-green-200">
          © 2026 I Am Shop 
        </p>
      </div>

      {/* ===== Right Form ===== */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your email to receive reset instructions
          </p>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
