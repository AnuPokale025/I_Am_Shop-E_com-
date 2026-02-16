import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Loader2,
  SlidersHorizontal,
  Star
} from "lucide-react";
import { categoryAPI, productAPI } from "../../api/axios";

const AdminProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= GET IMAGE FROM YOUR BODY ================= */
  const getProductImage = (product) => {
    if (!product.images || product.images.length === 0) {
      return "/placeholder.png";
    }

    // Try to find primary image
    const primaryImage = product.images.find((img) => img.primary);

    return (
      primaryImage?.imageUrl ||
      product.images[0]?.imageUrl ||
      "/placeholder.png"
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        categoryAPI.getAll(),
        productAPI.getAll(),
      ]);
      setCategories(catRes.data || []);
      setProducts(prodRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-green-600 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">
            🛒 Products
          </h1>
          <p className="text-sm opacity-90">
            Manage your catalog
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${activeCategory === "all"
              ? "bg-white text-green-600"
              : "bg-green-500/30"
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${activeCategory === cat.id
                ? "bg-white text-green-600"
                : "bg-green-500/30"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-28 object-contain pl-10"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />

                {/* Rating */}
                {product.rating && (
                  <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full flex items-center text-xs">
                    <Star size={12} className="text-green-600 mr-1" />
                    {product.rating}
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2">
                  {product.name}
                  {product.description}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    ₹{product.price} <br />
                    <h1 className="line-through text-gray-100"> ₹{product.mrp} </h1>
                  </span>

                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Floating Filter Button */}
      <button className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg">
        <SlidersHorizontal />
      </button>
    </div>
  );
};

export default AdminProduct;
