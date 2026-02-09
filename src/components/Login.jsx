// import React, { useState } from "react";
// import { ShoppingBag, Mail, Lock, User } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import { login as authLogin } from "../../api/axios.js";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // UI only
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ REAL API LOGIN
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await authLogin({
//         email,
//         password,
//         role: role.toUpperCase(), // Include role in login
//       });

//       // ✅ Expecting backend response
//       // { token, role, email }
//       const { data: { token, role: backendRole } } = res;

//       // store auth data
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", backendRole);
//       localStorage.setItem("isLoggedIn", "true");

//       // redirect by role
//       if (backendRole === "USER") {
//         navigate("/nav");
//       } else if (backendRole === "VENDOR") {
//         navigate("/vendor-dashboard");
//       } else {
//         setError("Invalid role received from server");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Invalid email or password ❌"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-black text-white p-3 rounded-full">
//             <ShoppingBag size={28} />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Login to your account
//         </p>

//         {/* Error */}
//         {error && (
//           <p className="mb-4 text-center text-red-500 text-sm">
//             {error}
//           </p>
//         )}

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleLogin}>

//           {/* Email */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Role selector (UI only) */}
//           <div className="relative">
//             <User className="absolute left-3 top-3 text-gray-400" size={18} />
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black"
//             >
//               <option value="user">User</option>
//               <option value="vendor">Vendor</option>
//             </select>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
//           >
//             {loading ? "Logging in..." : `Login as ${role === "user" ? "User" : "Vendor"}`}
//           </button>
//         </form>

//         {/* Signup */}
//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-black font-semibold hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
