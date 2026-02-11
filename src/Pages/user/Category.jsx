import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../api/user.api"; // ✅ adjust path if needed

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // ✅ AXIOS API CALL
        const data = await userAPI.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category fetch error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (id) => {
    navigate(`/products?category=${id}`);
  };

  /* ===== Skeleton Loader ===== */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-800">
            Shop by Category
          </h1>
          <p className="text-gray-500 text-sm">
            Fresh picks across all categories
          </p>
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <p className="text-gray-500">No categories available</p>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.id}
              onClick={() => handleClick(cat._id || cat.id)}
              className="cursor-pointer bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="bg-[#f1f3ff] rounded-xl h-20 flex items-center justify-center overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              {/* Name */}
              <p className="mt-2 text-sm font-medium text-center text-gray-800 line-clamp-2">
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {categories.length > 0 && (
          <div className="mt-10 bg-green-500 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                Explore all categories
              </h2>
              <p className="text-green-100 text-sm">
                {categories.length}+ categories waiting for you
              </p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-50"
            >
              View Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
