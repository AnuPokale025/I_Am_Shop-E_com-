import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  X,
} from "lucide-react";
import wishlistAPI from "../../api/wishlist.api";
import apiClient from "../../api/axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Track if component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    loadWishlist();
    window.scrollTo({ top: 0 });

    // ✅ Cleanup when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  /* ================= LOAD WISHLIST ================= */
  const loadWishlist = async () => {
    try {
      if (isMounted.current) {
        setLoading(true);
        setError("");
      }

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

      // ✅ Only update state if component still mounted
      if (isMounted.current) {
        setWishlistItems(productsWithImages);
      }
    } catch {
      if (isMounted.current) {
        setError("Failed to load wishlist");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  /* ================= REMOVE ITEM (Optimistic UI) ================= */
  const handleRemoveItem = async (productId) => {
    const previousItems = wishlistItems;

    // ✅ Instant UI update
    setWishlistItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );

    try {
      await wishlistAPI.removeFromWishlist(productId);
    } catch {
      // ❌ Rollback if failed
      if (isMounted.current) {
        setWishlistItems(previousItems);
        setError("Failed to remove item");
      }
    }
  };

  /* ================= CLEAR ALL ================= */
  const handleClearAll = async () => {
    const previousItems = wishlistItems;

    // ✅ Instant UI clear
    setWishlistItems([]);

    try {
      await wishlistAPI.clearWishlist();
    } catch {
      if (isMounted.current) {
        setWishlistItems(previousItems);
        setError("Failed to clear wishlist");
      }
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

      {/* Loading */}
      {loading && (
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && wishlistItems.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow text-center">
          <Heart className="mx-auto text-yellow-500 mb-4" size={40} />
          <h2 className="text-xl font-bold mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Save items you love and come back to them anytime.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <ShoppingBag size={16} />
            Browse Products
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Product Grid */}
      {!loading && wishlistItems.length > 0 && (
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

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-xl">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/product/${item.productId}`)
                    }
                    className="border-2 border-green-600 text-green-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 hover:text-white transition"
                  >
                    VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;