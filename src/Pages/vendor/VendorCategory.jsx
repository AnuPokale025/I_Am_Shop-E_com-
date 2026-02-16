import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const VendorCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await vendorAPI.getCategories();
      const list = Array.isArray(res) ? res : res?.categories || [];

      setCategories(list);
    } catch (err) {
      console.error("Category fetch failed", err);
      setError("Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteCategory = async (categoryId) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await vendorAPI.deleteCategory(categoryId);
      console.log("delete id");
      
      setCategories((prev) =>
        prev.filter((c) => (c.categoryId || c._id) !== categoryId)
      );
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= SEARCH ================= */
  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  text-gray-500"> Loading categories...
        {/* <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" /> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        {error}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24">
      {/* HEADER */}
      <div className="sticky top-0 bg-white z-40 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">Your Categories</h1>
          <p className="text-xs text-gray-500">Manage your store categories</p>

          {/* SEARCH */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="px-4 mt-4 space-y-4">
        {filtered.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <Package className="mx-auto mb-2" />
            No categories found
          </div>
        )}

        {filtered.map((c) => (
          <div
            key={c.categoryId || c.id}
            className="bg-white rounded-2xl shadow-sm p-3 flex gap-3"
          >
            {/* <img
              src={c.image || "/placeholder.png"}
              alt={c.name}
              className="w-20 h-20 rounded-xl object-cover border"
            /> */}

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <button
                  onClick={() => deleteCategory(c.categoryId || c._id)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {c.description || "No description"}
              </p>

              <div className="flex gap-3 mt-3">
                <Link
                  to={`/vendor/categories/${c.categoryId ?? c._id}`}
                  className="text-xs flex items-center gap-1 text-green-600"
                >
                  <Edit size={14} /> Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD CATEGORY BUTTON */}
      <Link
        to="/vendor/categories/add"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-xl"
      >
        <Plus />
      </Link>
    </div>
  );
};

export default VendorCategory;
