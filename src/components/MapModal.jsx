import { X, MapPin } from "lucide-react";

export default function MapModal({ isOpen, onClose, currentLocation, onLocationChange }) {
  if (!isOpen) return null;

  // Sample locations for selection
  const sampleLocations = [
    { id: 1, name: "Ganeshpeth, Nagpur", lat: 21.1463, lng: 79.0888 },
    { id: 2, name: "Civil Lines, Nagpur", lat: 21.1547, lng: 79.0781 },
    { id: 3, name: "Ladgaon, Nagpur", lat: 21.1652, lng: 79.0634 },
    { id: 4, name: "Dharampeth, Nagpur", lat: 21.1369, lng: 79.0942 },
    { id: 5, name: "Sadar, Nagpur", lat: 21.1489, lng: 79.0813 }
  ];

  const handleSelectLocation = (location) => {
    onLocationChange(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MapPin size={20} className="text-green-600" />
            Select Delivery Location
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {/* Current Location Display */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-2">Current Location</h4>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-green-600" />
              <span>{currentLocation}</span>
            </div>
          </div>

          {/* Location Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search for an address
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter street, area, or landmark..."
                className="w-full border rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Sample Locations */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Popular Areas in Nagpur</h4>
            <div className="space-y-2">
              {sampleLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleSelectLocation(location)}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-green-600" />
                    <span className="font-medium">{location.name}</span>
                  </div>
                  <button className="text-green-600 text-sm font-medium hover:underline">
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-2">Select on Map</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MapPin size={40} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Interactive Map Preview</p>
                <p className="text-gray-400 text-xs mt-1">(Map integration coming soon)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}