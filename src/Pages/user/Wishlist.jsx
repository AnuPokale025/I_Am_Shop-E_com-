import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Trash2,
  Clock,
  ShoppingBag,
  ArrowRight,
  Star,
  X,
  ShoppingCart,
} from "lucide-react";
import wishlistAPI from "../../api/wishlist.api";
import apiClient from "../../api/axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
    window.scrollTo({ top: 0 });
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await wishlistAPI.getWishlist();
      const items = res?.items || [];

      const productsWithImages = await Promise.all(
        items.map(async (item) => {
          try {
            const productRes = await apiClient.get(
              `/products/${item.productId}`
            );
            const product = productRes.data;

            let imageUrl = "/placeholder.png";
            if (product?.images?.length > 0) {
              const imageName = product.images[0]?.imageUrl;
              imageUrl = imageName?.startsWith("http")
                ? imageName
                : `https://iamashop-production.up.railway.app/api/products/image/${imageName}`;
            }

            return {
              productId: item.productId,
              name: product?.name || item.productName,
              price: Number(product?.price || item.price || 0),
              image: imageUrl,
            };
          } catch {
            return {
              productId: item.productId,
              name: item.productName,
              price: Number(item.price || 0),
              image: "/placeholder.png",
            };
          }
        })
      );

      setWishlistItems(productsWithImages);
    } catch {
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch {
      setError("Failed to remove item");
    }
  };

  const handleClearAll = async () => {
    try {
      await wishlistAPI.clearWishlist();
      setWishlistItems([]);
    } catch {
      setError("Failed to clear wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          My Wishlist
          {!loading && wishlistItems.length > 0 && (
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-sm font-bold">
              {wishlistItems.length}
            </span>
          )}
        </h1>

        {!loading && wishlistItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 text-sm font-semibold border px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <X size={14} /> Clear All
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="min-h-screen flex justify-center items-center bg-slate-50">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
              <ShoppingCart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600" size={28} />
            </div>
            <p className="mt-4 text-slate-600 font-medium">Loading your wishlist...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && wishlistItems.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-100 border-4 border-yellow-400">
            <Heart className="text-yellow-500" size={36} />
          </div>
          <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save items you love and come back to them anytime.
          </p>
          <Link
            to="/subcategory/:subId/products"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <ShoppingBag size={16} />
            Browse Products
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.productId}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition group p-2"
          >
            <div className="relative bg-gray-50 p-6 flex items-center justify-center h-56 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="h-40 object-contain group-hover:scale-105 transition"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />


              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="absolute top-3 right-3 bg-white border rounded-full p-2 hover:bg-red-50"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>

            <div className="p-4">
              <p className="text-base font-semibold line-clamp-2 mb-3">
                {item.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-green-700 font-semibold mt-1">
                <Clock className="w-3 h-3" />
                10–15 mins
              </div>

              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-500">4.5</span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-xl">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>


                <button
                  onClick={() => navigate(`/product/${item.productId}`)}
                  className="border-2 border-green-600 text-green-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 hover:text-white transition"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Bar */}
      {!loading && wishlistItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 md:hidden">
          <button
            onClick={handleClearAll}
            className="flex-1 border rounded-xl py-3 text-sm font-semibold hover:bg-red-50"
          >
            Clear All
          </button>
          <Link
            to="/products"
            className="flex-1 bg-black text-white rounded-xl py-3 text-center font-semibold"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;