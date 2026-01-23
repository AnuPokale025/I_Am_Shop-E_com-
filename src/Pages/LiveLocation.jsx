import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function LiveLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Permission denied or location unavailable");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div className="p-4 border rounded-md max-w-md">
      <button
        onClick={getLocation}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
      >
        <MapPin size={18} />
        Use Live Location
      </button>

      {location && (
        <div className="mt-4 text-sm text-gray-700">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}

      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
