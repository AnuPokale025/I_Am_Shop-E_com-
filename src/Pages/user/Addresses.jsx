import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../api/user.api";
import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

const emptyForm = {
  fullName: "",
  houseNo: "",
  area: "",
  city: "",
  pinCode: "",
  landmark: "",
};


// const CheckoutStep2 = () => {
//   const { state } = useLocation();
//   const address = state?.address;

//   return <div>{address?.houseNo}</div>;
// };


const Address = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await userAPI.getProfile();
      setProfile(res?.data || res);
    } catch (err) {
      console.error("❌ Profile fetch failed", err);
    }
  };

  /* ================= FETCH ADDRESSES ================= */
  const fetchAddresses = async () => {
    try {
      const res = await userAPI.getAddresses();
      setAddresses(Array.isArray(res?.data) ? res.data : res || []);
    } catch (err) {
      console.error("❌ Address fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  /* ================= DEFAULT ADDRESS ================= */
  const defaultAddress = profile?.address || profile?.add;

  const addressText = (() => {
    if (!defaultAddress) return "Add your delivery address";
    if (typeof defaultAddress === "string") return defaultAddress;

    const parts = [];
    if (defaultAddress.houseNo) parts.push(defaultAddress.houseNo);
    if (defaultAddress.area) parts.push(defaultAddress.area);
    if (defaultAddress.city) parts.push(defaultAddress.city);
    if (defaultAddress.pinCode || defaultAddress.pincode)
      parts.push(defaultAddress.pinCode || defaultAddress.pincode);

    return parts.join(", ");
  })();

  /* ================= NAVIGATE ON DEFAULT SELECT ================= */
  // const handleDefaultSelect = () => {
  //   if (!defaultAddress) return;

  //   navigate("/checkout/step-2", {
  //     state: {
  //       address: defaultAddress,
  //       isDefault: true,
  //     },
  //   });
  // };
  const handleClick = () => {
    navigate("/orders")
  }


  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await userAPI.removeAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Delete failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowModal(true);
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    try {
      if (editingAddress) {
        const updated = await userAPI.updateAddress(
          editingAddress._id,
          formData
        );
        setAddresses((prev) =>
          prev.map((a) => (a._id === editingAddress._id ? updated : a))
        );
      } else {
        const created = await userAPI.addAddress(formData);
        setAddresses((prev) => [...prev, created]);
      }
      closeModal();
    } catch (err) {
      console.error("❌ Save address failed", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAddress(null);
    setFormData(emptyForm);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">My Addresses</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* DEFAULT ADDRESS (CLICKABLE) */}
        <div
          onClick={handleClick}
          className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm cursor-pointer border hover:border-green-500"
        >
          <MapPin className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <p className="text-xs text-gray-500">Default Delivery Address</p>
            <p className="font-medium text-gray-900">{addressText}</p>
            <p className="text-xs text-green-600 mt-1">
              Tap to continue checkout →
            </p>
          </div>
        </div>

        {/* ADD NEW */}
        <button
          onClick={() => {
            setEditingAddress(null);
            setFormData(emptyForm);
            setShowModal(true);
          }}
          className="w-full p-4 border-2 border-dashed border-green-500 rounded-xl text-green-600 font-semibold"
        >
          + Add New Address
        </button>

        {/* ADDRESS LIST */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr._id} className="bg-white rounded-xl p-5 shadow border">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{addr.fullName}</h3>
                  <p className="text-sm text-gray-600">{addr.houseNo}</p>
                  <p className="text-sm text-gray-600">{addr.area}</p>
                  <p className="text-sm text-gray-600">{addr.city}</p>
                  <p className="text-sm text-gray-600">{addr.pinCode}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-green-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold">
              {editingAddress ? "Edit Address" : "Add Address"}
            </h2>

            {Object.keys(emptyForm).map((key) => (
              <input
                key={key}
                placeholder={key}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="w-full border p-3 rounded"
              />
            ))}

            <div className="flex gap-3">
              <button onClick={closeModal} className="flex-1 border p-3 rounded">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white p-3 rounded"
              >
                {editingAddress ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
