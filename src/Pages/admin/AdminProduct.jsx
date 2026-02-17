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
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= GET PRODUCT IMAGE ================= */
  const getProductImage = (product) => {
    if (!product.images || product.images.length === 0) {
      return "/placeholder.png";
    }

    const primaryImage = product.images.find((img) => img.primary);

    return (
      primaryImage?.imageUrl ||
      product.images[0]?.imageUrl ||
      "/placeholder.png"
    );
  };

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        categoryAPI.getAll(),
        productAPI.getAll(),
      ]);

      setCategories(catRes?.data || []);
      setProducts(prodRes?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading products...
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
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              🛒 Products
            </h1>
            <p className="text-sm text-gray-500">
              Manage your product catalog
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Total Products:{" "}
            <span className="font-semibold text-gray-800">
              {filteredProducts.length}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto mt-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition
              ${
                activeCategory === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition
                ${
                  activeCategory === cat.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border">
            <p className="text-gray-500 font-medium">
              No products found
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/admin/products/${product.id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border"
            >
              {/* Image */}
              <div className="relative h-40 flex items-center justify-center bg-gray-50">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-28 object-contain"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />

                {product.rating && (
                  <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full flex items-center text-xs shadow">
                    <Star size={12} className="text-green-600 mr-1" />
                    {product.rating}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                  {product.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.mrp && (
                      <span className="ml-2 text-xs text-gray-400 line-through">
                        ₹{product.mrp}
                      </span>
                    )}
                  </div>

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
      <button className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition">
        <SlidersHorizontal />
      </button>
    </div>
  );
};

export default AdminProduct;
