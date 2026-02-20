import React, { useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LocationModal = ({ isOpen, onClose, setLocation }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();
          const address = data?.address || {};

         

          // ✅ Build FULL address
          const fullAddress = [
            address.name || data.name,
            // address.road,
            address.neighbourhood,
            address.city || address.town || address.village,
            address.state,
            address.postcode,
            address.country,
          ]
            .filter(Boolean)
            .join(", ");

          const finalLocation = fullAddress || "Your Location";

          setLocation(finalLocation);
          localStorage.setItem("selectedLocation", finalLocation);

        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setLocation("Your Location");
        }

        setLoading(false);
        onClose();
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Plz Turn on location and allow permission to access your location.");
        setLoading(false);
      }
    );
  };

  // const handleAddAddress = () => {
  //   onClose();
  //   navigate("/add-address");
  // };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Select Location
        </h2>

        <button
          onClick={handleCurrentLocation}
          disabled={loading}
          className="w-full flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-100 transition mb-4 disabled:opacity-50"
        >
          <MapPin className="text-green-600" />
          <span>
            {loading ? "Detecting location..." : "Use My Current Location"}
          </span>
        </button>
{/* 
        <button
          onClick={handleAddAddress}
          className="w-full flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-100 transition"
        >
          <Plus className="text-green-600" />
          <span>Add Address Manually</span>
        </button> */}

      </div>
    </div>
  );
};

export default LocationModal;