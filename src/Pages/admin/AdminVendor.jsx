import { useEffect, useState } from "react";
import { Loader2, Search, Store, Trash2, User } from "lucide-react";
import adminAPI from "../../api/admin.api";

const AdminUser = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getVendors();
      setVendors(res.data || []);
    } catch (err) {
      console.error("Vendors fetch error:", err);
      setError(err?.response?.data?.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (!confirmDelete) return;

    try {
      await adminAPI.deleteVendor(id);
      setVendors((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert("Failed to delete vendor");
    }
  };

  /* ================= SEARCH FILTER ================= */
  const filteredVendors = vendors.filter((v) =>
    `${v.email} ${v.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <Loader2 className="animate-spin mr-2" />
        Loading vendors...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              🏪 Vendors
            </h1>
            <p className="text-sm text-gray-500">
              Manage all registered vendors
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by email or name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2 border focus:ring-2 focus:ring-green-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Count */}
        <div className="mt-4 text-sm text-gray-500">
          Total Vendors:{" "}
          <span className="font-semibold text-gray-800">
            {filteredVendors.length}
          </span>
        </div>
      </div>

      {/* ================= VENDOR GRID ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVendors.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border">
            <Store className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500 font-medium">
              No vendors found
            </p>
          </div>
        ) : (
          filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Store className="text-green-600" size={20} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {vendor.name || "Vendor"}
                  </p>

                  <p className="text-sm text-gray-500 truncate">
                    {vendor.email}
                  </p>

                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {vendor.role || "VENDOR"}
                  </span>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUser;
