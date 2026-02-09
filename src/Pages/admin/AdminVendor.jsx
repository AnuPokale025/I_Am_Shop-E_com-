import { useEffect, useState } from "react";
import { Loader2, Search, Store, Trash2 } from "lucide-react";
import adminAPI from "../../api/admin.api";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getVendors();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Vendors fetch error:", err);
      setError(err?.response?.data?.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vendor?")) return;
    try {
      await adminAPI.deleteVendor(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Failed to delete vendor");
    }
  };

  const filteredVendors = users.filter((v) =>
    v.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">
      <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
    </p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-green-600 p-4 text-white">
        <h1 className="text-xl font-bold">🏪 Vendors</h1>
        <p className="text-sm opacity-90">Manage all vendors</p>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search vendor by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg pl-10 pr-4 py-2 text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVendors.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No vendors found
          </p>
        ) : (
          filteredVendors.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Store className="text-green-600" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {u.email}
                  </p>
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                    {u.role}
                  </span>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(u.id)}
                  className="p-2 rounded-full text-red-500 hover:bg-red-50"
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
