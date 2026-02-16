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
    if (!window.confirm("Delete this user?")) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ===================== LOADER ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {/* <Loader2 className="w-10 h-10 text-green-600 animate-spin" /> */}
         <div className="min-h-screen flex items-center justify-center  text-gray-500">
        Loading customers...
      </div>
      </div>
    );
  }

  /* ===================== ERROR ===================== */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 bg-green-600 text-white p-4 z-20">
        <h1 className="text-xl font-bold">👥 Users</h1>
        <p className="text-sm opacity-90">Manage all users</p>

        {/* Search */}
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      {/* ================= USERS LIST ================= */}
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No users found
          </p>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="text-green-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {u.email}
                  </p>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {u.role}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
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
