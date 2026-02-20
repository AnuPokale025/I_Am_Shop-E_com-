import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userAPI from "../../api/user.api";
import { ShoppingCart } from "lucide-react";

const SubCategory = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchSubCategories();
  }, [categoryId]);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);              // ✅ start loading
      setError("");

      const data = await userAPI.getSubCategories(categoryId);
      setSubCategories(data || []);
    } catch (error) {
      console.error("Subcategory fetch error:", error);
      setError("Failed to load subcategories");
    } finally {
      setLoading(false);             // ✅ stop loading
    }
  };

  const handleClick = (subId) => {
    navigate(`/subcategory/${subId}/products`);
  };

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
            <ShoppingCart
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600"
              size={28}
            />
          </div>
          <p className="mt-4 text-slate-600 font-medium">
            Loading your subcategories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fd] p-6">
      <h2 className="text-2xl font-bold mb-6">Select Sub Category</h2>

      {/* ERROR STATE */}
      {error && (
        <div className="mb-4 text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && subCategories.length === 0 && (
        <div className="text-gray-500">No subcategories found.</div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subCategories.map((sub) => (
          <div
            key={sub._id || sub.id}
            onClick={() => handleClick(sub._id || sub.id)}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition cursor-pointer text-center"
          >
            <p className="font-semibold text-gray-700">{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;