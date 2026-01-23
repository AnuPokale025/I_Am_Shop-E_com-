import React from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, ShoppingBag, LogOut, X } from "lucide-react";

const AccountModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CONTENT */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">My Account</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* PROFILE BRIEF */}
        <div className="flex items-center gap-4 mb-8 p-3 bg-gray-50 rounded-xl">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
            JD
          </div>
          <div>
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">+91 9511723705</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="space-y-2">
          <button
            onClick={() => handleNavigation("/profile")}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-gray-50"
          >
            <User size={20} className="text-blue-500" />
            <span className="font-medium">Profile</span>
          </button>


          <button
            onClick={() => handleNavigation("/add")}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-gray-50"
          >
            <MapPin size={20} className="text-green-500" />
            <span className="font-medium">Saved Addresses</span>
          </button>

          <button
            onClick={() => handleNavigation("/order")}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-gray-50"
          >
            <ShoppingBag size={20} className="text-yellow-500" />
            <span className="font-medium">My Orders</span>
          </button>
          
          <button
            onClick={() => handleNavigation("/faq")}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-gray-50"
          >
            <ShoppingBag size={20} className="text-yellow-500" />
            <span className="font-medium">FAQ's</span>
          </button>

          <div className="my-2 border-t" />

          <button
            onClick={() => {
              console.log("Logout");
              onClose();
            }}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
