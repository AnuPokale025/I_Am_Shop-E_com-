import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Package,
  FileText,
  Gift,
  Shield,
  LogOut,
  X,
  BookOpen
} from "lucide-react";

const SidebarModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex">
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* SIDEBAR CONTENT */}
      <div className="relative flex h-full w-full max-w-xs flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">My Account</span>
            <span className="text-xs text-gray-500">+91 9511723705</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto py-2">
          <SidebarItem 
            icon={MapPin} 
            label="My Addresses" 
            onClick={() => handleNavigation("/add")} 
          />
          <SidebarItem 
            icon={Package} 
            label="My Orders" 
            onClick={() => handleNavigation("/order")} 
          />
          <SidebarItem 
            icon={BookOpen} 
            label="FAQ" 
            onClick={() => handleNavigation("/faq")} 
          />
          <SidebarItem 
            icon={Gift} 
            label="E-Gift Cards" 
            onClick={() => handleNavigation("/")} 
          />
          <SidebarItem 
            icon={Shield} 
            label="Account Privacy" 
            onClick={() => handleNavigation("/")} 
          />
          <div className="my-2 border-t" />
          <SidebarItem 
            icon={LogOut} 
            label="Logout" 
            onClick={() => {
              console.log("Logout");
              onClose();
            }} 
          />
        </nav>

        {/* FOOTER (OPTIONAL) */}
        <div className="border-t p-4 text-center text-xs text-gray-400">
          v1.0.0 | I am Shop
        </div>
      </div>
    </div>
  );
};

function SidebarItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-gray-50"
    >
      <Icon size={20} className="text-gray-500" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
}

export default SidebarModal;
