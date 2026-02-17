import { useEffect, useState } from "react";
import { Search, Trash2, User, Loader2 } from "lucide-react";
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
      const res = await adminAPI.getUsers();
      setUsers(res?.data || []);
    } catch (err) {
      console.error("Users fetch error:", err);
      setError(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await adminAPI.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  /* ================= SEARCH FILTER ================= */
  const filteredUsers = users.filter((u) =>
    `${u.email} ${u.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading customers...
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
              👥 Customers
            </h1>
            <p className="text-sm text-gray-500">
              Manage all registered users
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
          Total Users:{" "}
          <span className="font-semibold text-gray-800">
            {filteredUsers.length}
          </span>
        </div>
      </div>

      {/* ================= USERS GRID ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border">
            <User className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500 font-medium">
              No users found
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="text-green-600" size={20} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.name || "Customer"}
                  </p>

                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>

                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {user.role || "USER"}
                  </span>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(user.id)}
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
