import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  TrendingUp,
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await vendorAPI.getProducts();

      // Normalize response
      const productData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setProducts(productData);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ================= IMAGE HELPER ================= */
  const getProductImage = (product) => {
    if (!product?.images?.length) {
      return "/placeholder.png";
    }

    const primaryImage = product.images.find((img) => img.primary);
    return (
      primaryImage?.imageUrl ||
      product.images[0]?.imageUrl ||
      "/placeholder.png"
    );
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await vendorAPI.deleteProduct(id);

      // Optimistic update
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts = products.filter((p) =>
    (p?.name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading products...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 bg-white z-40 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">Your Products</h1>
          <p className="text-xs text-gray-500">Manage inventory fast</p>

          {/* SEARCH */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <div className="px-4 mt-4 space-y-4">
        {filteredProducts.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <Package className="mx-auto mb-2" />
            <p>No products found</p>
          </div>
        )}

        {filteredProducts.map((p) => (
          <div
            key={p?.id}
            className="bg-white rounded-2xl shadow-sm p-3 flex gap-3"
          >
            <img
              src={getProductImage(p)}
              alt={p?.name || "Product"}
              className="h-28 w-28 object-contain rounded-lg bg-gray-50"
              onError={(e) => (e.target.src = "/placeholder.png")}
            />

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm">
                  {p?.name || "Unnamed Product"}
                </h3>

                <button
                  onClick={() => deleteProduct(p?.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {p?.description || "No description available"}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-green-600">
                  ₹{p?.price ?? 0}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    (p?.quantity ?? 0) > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {(p?.quantity ?? 0) > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Stock: {p?.quantity ?? 0}</span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={14} className="text-green-500" />
                  {p?.sales ?? 0} sold
                </span>
              </div>

              <div className="flex gap-3 mt-3">
                <Link
                  to={`/vendor/products/${p?.id}`}
                  className="text-xs flex items-center gap-1 text-green-600 hover:underline"
                >
                  <Edit size={14} /> Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ADD BUTTON ================= */}
      <Link
        to="/vendor/products/add"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition"
      >
        <Plus />
      </Link>
    </div>
  );
};

export default VendorProducts;
