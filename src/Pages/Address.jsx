import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../assets/new/images.jpg";

export default function Address() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    houseNo: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    type: "Home" // Default to Home
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = { ...formData, id: Date.now() };
    setAddresses(prev => [...prev, newAddress]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      mobile: "",
      houseNo: "",
      area: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      type: "Home"
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Content */}
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <img src={Img1} alt="No saved address" className="w-40 mb-6" />
            <h2 className="text-lg font-semibold mb-1">
              You have no saved addresses
            </h2>
            <p className="text-gray-500 mb-6">
              Tell us where you want your orders delivered
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Add New Address
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Saved Addresses</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="border rounded-xl p-5 hover:border-green-600 transition-colors relative group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                      {addr.type}
                    </span>
                    <h3 className="font-bold">{addr.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {addr.houseNo}, {addr.area}
                    {addr.landmark && `, ${addr.landmark}`}
                    <br />
                    {addr.city} - {addr.pincode}
                  </p>
                  <p className="mt-3 text-sm font-medium">
                    Phone: {addr.mobile}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold text-gray-800">Add New Address</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Aniket Singh"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">House No. / Building Name</label>
                  <input
                    required
                    type="text"
                    name="houseNo"
                    value={formData.houseNo}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Area / Locality</label>
                  <input
                    required
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Pincode</label>
                  <input
                    required
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">City</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                  />
                </div>
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Address Type</label>
                <div className="flex gap-4">
                  {["Home", "Work", "Other"].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={handleInputChange}
                        className="accent-green-600"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}