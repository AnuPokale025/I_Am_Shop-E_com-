import { useEffect, useState } from "react";
import adminAPI from "../../api/admin.api";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await adminAPI.getAdminProfile();
      setAdmins(data);
    } catch (err) {
      console.error("Fetch admins error:", err);
      setError(
        err?.response?.data?.message || "Failed to load admins"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await adminAPI.deleteAdmin(id);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete admin error:", err);
      alert("Failed to delete admin");
    }
  };

  if (loading) {
    return <p className="p-6">Loading admins...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-red-500 font-medium">
        {error}
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Management
      </h1>

      {admins.length === 0 ? (
        <p>No admins found.</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-t"
              >
                <td className="p-3">
                  {admin.name || "—"}
                </td>
                <td className="p-3">
                  {admin.email}
                </td>
                <td className="p-3 font-medium">
                  {admin.role}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admins;
