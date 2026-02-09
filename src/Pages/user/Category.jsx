import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://iamashop-production.up.railway.app/api/categories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(Array.isArray(data) ? data : []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  // Gradient colors for category cards (Blinkit style)
  const gradients = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
    "from-red-400 to-red-600",
    "from-indigo-400 to-indigo-600",
    "from-teal-400 to-teal-600",
    "from-orange-400 to-orange-600",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium"></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shop by Category
          </h1>
          <p className="text-gray-500">
            Explore our wide range of products across different categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {categories.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500">
              Categories will appear here once they're available
            </p>
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={category._id || category.id}
                onClick={() =>
                  handleCategoryClick(category._id || category.id)
                }
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image Container with Gradient Overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    {category.image ? (
                      <>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Gradient Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${
                            gradients[index % gradients.length]
                          } opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        ></div>
                      </>
                    ) : (
                      /* Fallback Gradient Background */
                      <div
                        className={`w-full h-full bg-gradient-to-br ${
                          gradients[index % gradients.length]
                        } flex items-center justify-center`}
                      >
                        <svg
                          className="w-16 h-16 text-white opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm text-center line-clamp-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-gray-500 text-center mt-1 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Categories Banner (Optional) */}
        {categories.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Can't find what you're looking for?
                </h2>
                <p className="text-green-50">
                  Browse all {categories.length} categories and discover amazing
                  products
                </p>
              </div>
              <Link to="/products" className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md">
                View All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;