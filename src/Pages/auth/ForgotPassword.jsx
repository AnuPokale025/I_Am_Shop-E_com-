import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import authAPI from "../../api/auth.api";

const ROLES = [
  { value: "USER", label: "User" },
  { value: "VENDOR", label: "Vendor" },
  { value: "ADMIN", label: "Admin" },
];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!role) {
      setError("Please select your account role.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authAPI.forgotPassword({ email: email.trim(), role });
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email: email.trim(), role });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-green-50">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-[420px] bg-green-600 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div>
          <h1 className="text-3xl font-serif mb-2">IamashoP</h1>
          <p className="text-sm text-green-100">
            Groceries delivered <br /> in minutes ⚡
          </p>
        </div>

        <div>
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck size={30} />
          </div>
          <h2 className="text-2xl font-serif italic mb-3">
            Recover your <br /> account safely
          </h2>
          <p className="text-sm text-green-100 leading-relaxed">
            We'll send a secure link to your inbox. <br />
            Follow the steps to reset your password.
          </p>
        </div>

        <ul className="space-y-3 text-sm text-green-100">
          {[
            "Enter your registered email address",
            "Select your account role",
            "Check your inbox for the reset link",
            "Create a strong new password",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-green-200">
          © 2026 IamashoP. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 transition-all duration-300">

          {success ? (
            /* SUCCESS */
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <CheckCircle2 className="text-green-600" size={36} />
              </div>

              <h2 className="text-2xl font-serif font-semibold mb-2">
                Check your inbox
              </h2>

              <p className="text-gray-500 mb-2">
                We've sent a password reset link to:
              </p>

              <div className="font-semibold bg-green-50 rounded-lg px-3 py-2 mb-4">
                {email}
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <ShieldCheck size={14} />{" "}
                  {ROLES.find((r) => r.value === role)?.label} account
                </span>
              </div>

              <Link
                to="/reset-password"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Verify & Reset Password
              </Link>

              <p className="text-sm text-gray-500 mt-4">
                Didn’t receive it?{" "}
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-green-600 font-semibold hover:text-green-800"
                >
                  {loading ? "Resending…" : "Resend email"}
                </button>
              </p>
            </div>
          ) : (
            /* FORM */
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
              >
                <ArrowLeft size={16} /> Back to Login
              </Link>

              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <Mail className="text-green-600" />
              </div>

              <h2 className="text-2xl font-serif font-semibold mb-1">
                Forgot Password?
              </h2>

              <p className="text-gray-500 text-sm mb-6">
                Enter your email and select your role. We'll send a reset link.
              </p>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-600 p-3 rounded mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                    Account role
                  </label>
                  <div className="flex gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setRole(r.value);
                          setError("");
                        }}
                        className={`flex-1 py-2 rounded-xl border text-sm font-medium transition
                          ${
                            role === r.value
                              ? "bg-green-100 border-green-500 text-green-700"
                              : "border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-600"
                          }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending link…
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;