import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Save, Edit2 } from "lucide-react";
import userAPI from "../../api/user.api";

/* ================= ADDRESS FORMATTER ================= */
const formatAddress = (address) => {
  if (!address) return "";
  if (typeof address === "string") return address;

  const parts = [
    address.houseNo,
    address.addressLine,
    address.area,
    address.landmark,
    address.city,
    address.pinCode || address.pincode,
  ];

  return parts.filter(Boolean).join(", ");
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getProfile();

      setProfile(data);

      setForm({
        fullName: data.fullName || data.name || "",
        email: data.email || "",
        phone: data.mobileNo || data.phone || "",
        address: formatAddress(data.address || data.add),
      });
    } catch (err) {
      console.error("Profile fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    try {
      setSaving(true);

      const payload = {
        fullName: form.fullName,
        mobileNo: form.phone,
        address: form.address, // backend accepts string
      };

      const updated = await userAPI.updateProfile(payload);

      setProfile(updated);
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Profile not found
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F5F7F2] px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* HEADER */}
        <div className="bg-[#0C831F] rounded-3xl p-6 text-white shadow">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#0C831F]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {profile.fullName || profile.name || "User"}
              </h2>
              <p className="text-sm text-green-100">Welcome back 👋</p>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-4">
          {/* EMAIL */}
          <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <Mail className="w-5 h-5 text-[#0C831F]" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{form.email}</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#0C831F]" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                {editMode ? (
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="font-medium">
                    {form.phone || "Not added"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#0C831F] mt-1" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Delivery Address</p>
                {editMode ? (
                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    rows="3"
                    className="w-full border rounded-lg px-3 py-2 mt-1 resize-none"
                  />
                ) : (
                  <p className="font-medium">
                    {form.address || "Add your delivery address"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="w-full mt-6 bg-[#0C831F] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Edit2 size={18} /> Edit Profile
          </button>
        ) : (
          <button
            onClick={handleUpdateProfile}
            disabled={saving}
            className="w-full mt-6 bg-[#0C831F] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
