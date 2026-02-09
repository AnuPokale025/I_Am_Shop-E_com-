import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  TrendingUp
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await vendorAPI.getProducts();
      setProducts(Array.isArray(response) ? response : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await vendorAPI.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-10 text-center"></div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24">
      {/* HEADER */}
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

      {/* LIST */}
      <div className="px-4 mt-4 space-y-4">
        {filtered.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <Package className="mx-auto mb-2" />
            No products found
          </div>
        )}

        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-sm p-3 flex gap-3"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm">{p.name}</h3>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500">{p.category}</p>

              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-green-600">
                  ₹{p.price}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.stock > 0 ? "In Stock" : "Out"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Stock: {p.stock}</span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={14} className="text-green-500" />
                  {p.sales} sold
                </span>
              </div>

              <div className="flex gap-3 mt-3">
                <Link
                  to={`/vendor/products/${p.id}/edit`}
                  className="text-xs flex items-center gap-1 text-green-600"
                >
                  <Edit size={14} /> Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FLOATING ADD BUTTON */}
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
