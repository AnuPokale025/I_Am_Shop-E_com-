import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Store,
  User,
} from "lucide-react";
import { login as authLogin } from "../../api/axios";
import Cookies from "js-cookie";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
    role: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(location.state?.message || "");

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authLogin({
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase(),
      });

      const { token, role, user } = res.data;
      Cookies.set("auth_token", token, { expires: 7 });

      const finalRole = role.toUpperCase();
      login(user, token, finalRole, formData.email);

      if (finalRole === "ADMIN") navigate("/admin/dashboard");
      else if (finalRole === "VENDOR") navigate("/vendor/dashboard");
      else navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FEE7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2">
            <Store className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              I Am Shop 
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Login in seconds ⚡
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm bg-red-50 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ROLE */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: "USER", icon: <User size={16} />, label: "User" },
              { role: "VENDOR", icon: <Store size={16} />, label: "Vendor" },
              { role: "ADMIN", icon: <Shield size={16} />, label: "Admin" },
            ].map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: r.role })
                }
                className={`flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium border
                ${
                  formData.role === r.role
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {r.icon}
                {r.label}
              </button>
            ))}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* FORGOT */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SIGNUP */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{" "}
          <Link to="/signup" className="text-green-600 font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
