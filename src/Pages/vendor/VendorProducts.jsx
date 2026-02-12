import React, { useState, useEffect } from "react";
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
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await vendorAPI.getProducts();
      console.log("Products response:", response);
      // Always ensure array
      if (Array.isArray(response)) {
        setProducts(response);
      } else if (Array.isArray(response?.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    if (!id) return;

    // if (!window.confirm("Delete this product?")) return;

    try {
      await vendorAPI.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p?.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };

  /* ================= SAFE FILTER ================= */
  const filteredProducts = products.filter((p) => {
    const name = p?.name ?? "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
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
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="px-4 mt-4 space-y-4">
        {filteredProducts.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <Package className="mx-auto mb-2" />
            No products found
          </div>
        )}

        {filteredProducts.map((p) => (
          <div
            key={p?.id}
            className="bg-white rounded-2xl shadow-sm p-3 flex gap-3"
          >
            <img
              src={getProductImage(p)}
              alt={p?.name}
              className="h-28 object-contain"
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm">
                  {p?.name || "Unnamed Product"}
                </h3>

                <button
                  onClick={() => deleteProduct(p?.id)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500">
                {p?.description || "decription"}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-green-600">
                  ₹{p?.price ?? 0}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${(p?.quantity ?? 0) > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {(p?.quantity ?? 0) > 0 ? "In Stock" : "Out"}
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
                  className="text-xs flex items-center gap-1 text-green-600"
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
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-xl"
      >
        <Plus />
      </Link>
    </div>
  );
};

export default VendorProducts;
