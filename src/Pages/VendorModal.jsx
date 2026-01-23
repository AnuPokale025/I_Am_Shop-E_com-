import { X, Store, User, Mail, Lock } from "lucide-react";
import { useState } from "react";

export default function VendorModal({ isOpen, onClose }) {
  const [vendor, setVendor] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    password: "",
  });
  const [submittedVendor, setSubmittedVendor] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Account Created:", vendor);
    setSubmittedVendor(vendor);
    
    // Reset form
    setVendor({
      shopName: "",
      ownerName: "",
      email: "",
      password: "",
    });
  };

  // Show submitted details
  if (submittedVendor) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
          {/* Close Button */}
          <button 
            onClick={() => {
              setSubmittedVendor(null);
              onClose();
            }}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Success Header */}
          <div className="text-center p-6 pb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Account Created Successfully!</h3>
            <p className="text-gray-600">Here are your vendor details:</p>
          </div>

          {/* Vendor Details Card */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Store size={20} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Shop Name</p>
                  <p className="font-medium">{submittedVendor.shopName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User size={20} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Owner Name</p>
                  <p className="font-medium">{submittedVendor.ownerName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{submittedVendor.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Password</p>
                  <p className="font-medium">••••••••</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedVendor(null);
                onClose();
              }}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Create Vendor Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={vendor.shopName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={vendor.ownerName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={vendor.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={vendor.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
