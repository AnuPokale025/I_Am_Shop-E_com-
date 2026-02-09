import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  Phone,
  MapPin,
  Store,
} from "lucide-react";
import { signup as apiSignup } from "../../api/axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    add: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

    setLoading(true);

    try {
      const signupData = {
        fullname: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase(),
      };

      if (formData.phone) signupData.phone = formData.phone;

      const response = await apiSignup(signupData);

      if (response?.status === 200) {
        navigate("/login", {
          replace: true,
          state: {
            message: "Signup successful! Please login.",
            email: formData.email,
          },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FEE7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <Store className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              I Am Shop Signup
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Get started in under a minute ⚡
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ROLE */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: "USER", label: "User" },
              { role: "VENDOR", label: "Vendor" },
              { role: "ADMIN", label: "Admin", icon: <Shield size={14} /> },
            ].map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: r.role })
                }
                className={`py-2 rounded-lg text-sm font-medium border flex items-center justify-center gap-1
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

          {/* NAME */}
          <Input
            icon={<User />}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
          />

          {/* EMAIL */}
          <Input
            icon={<Mail />}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />

          {/* PHONE */}
          <Input
            icon={<Phone />}
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile number (optional)"
          />

          {/* ADDRESS */}
          <Input
            icon={<MapPin />}
            name="add"
            value={formData.add}
            onChange={handleChange}
            placeholder="Address"
          />

          {/* PASSWORD */}
          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
          />

          {/* CONFIRM PASSWORD */}
          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            show={showConfirmPassword}
            toggle={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ================= REUSABLE INPUTS ================= */

const Input = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      required
      className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
    />
  </div>
);

const PasswordInput = ({
  label,
  value,
  onChange,
  name,
  show,
  toggle,
}) => (
  <div className="relative">
    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type={show ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={label}
      className="w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
      {show ? <EyeOff /> : <Eye />}
    </button>
  </div>
);

export default Signup;
