import React, { useState } from "react";
import { ShoppingBag, Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // HARD-CODED CREDENTIALS
  const AUTH_EMAIL = "aniket@gmail.com";
  const AUTH_PASSWORD = "Aniket#123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === AUTH_EMAIL && password === AUTH_PASSWORD) {
      setError("");
      alert("Login Successful ✅");

      // store login state (optional)
      localStorage.setItem("isLoggedIn", "true");

      // redirect after login
      navigate("/nav");
    } else {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-black text-white p-3 rounded-full">
            <ShoppingBag size={28} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-center text-red-500 text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-black" />
              Remember me
            </label>
            <a href="#" className="text-black font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
