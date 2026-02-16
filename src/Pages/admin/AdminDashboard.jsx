import { useEffect, useState } from "react";
import adminAPI from "../../api/admin.api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersRes, vendorsRes, productsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getVendors(),
        adminAPI.getProducts(),
      ]);

      // show only first 5 items
      setUsers(usersRes.data.slice(0, 5));
      setVendors(vendorsRes.data.slice(0, 5));
      setProducts(productsRes.data.slice(0, 5));
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return  <div className="min-h-screen flex items-center justify-center  text-gray-500">
        Loading dashboard...
      </div>
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USERS */}
        <DashboardCard title="Latest Users">
          {users.map((u) => (
            <Item key={u.id} primary={u.email} secondary={u.role} />
          ))}
        </DashboardCard>

        {/* VENDORS */}
        <DashboardCard title="Latest Vendors">
          {vendors.map((v) => (
            <Item key={v.id} primary={v.storeName || v.email} />
          ))}
        </DashboardCard>

        {/* PRODUCTS */}
        <DashboardCard title="Latest Products">
          {products.map((p) => (
            <Item key={p.id} primary={p.name} secondary={`₹${p.price}`} />
          ))}
        </DashboardCard>
      </div>
    </div>
  );
};

/* ================= SMALL REUSABLE COMPONENTS ================= */

const DashboardCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const Item = ({ primary, secondary }) => (
  <div className="flex justify-between text-sm border-b pb-1">
    <span className="font-medium">{primary}</span>
    {secondary && <span className="text-gray-500">{secondary}</span>}
  </div>
);

export default AdminDashboard;
