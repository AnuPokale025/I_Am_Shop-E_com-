import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, Clock } from "lucide-react";
import wishlistAPI from "../../api/wishlist.api";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await wishlistAPI.getWishlist();

      const items =
        res?.items ||
        res?.wishlist ||
        res?.data ||
        res ||
        [];

      const mappedItems = items.map((item, index) => {
        const product = item.product || item.productId || item;

        return {
          id: item.id || index,
          productId: product?.id || product?._id,
          name: product?.productName || product?.name || "Product",
          image:
            product?.image ||
            product?.images?.[0] ||
            "/placeholder.png",
          price: Number(product?.price || 0),
        };
      });

      setWishlistItems(mappedItems);
    } catch (err) {
      console.error("❌ Fetch wishlist failed", err);
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  /* ================= REMOVE ITEM ================= */
  const handleRemoveItem = async (itemId, productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.id !== itemId)
      );
    } catch {
      setError("Failed to remove item");
    }
  };

  /* ================= CLEAR ALL ================= */
  const handleClearAll = async () => {
    if (!window.confirm("Clear entire wishlist?")) return;
    try {
      await wishlistAPI.clearWishlist();
      setWishlistItems([]);
    } catch {
      setError("Failed to clear wishlist");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7F2]">
        <Heart className="h-10 w-10 text-red-400 animate-pulse" />
        <p className="mt-3 text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F2] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          My Wishlist ❤️
        </h1>
        <p className="text-sm text-gray-500">
          {wishlistItems.length} saved items
        </p>
      </div>

      {error && (
        <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-20 px-6">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Save items you love & buy later
          </p>
          <Link
            to="/products"
            className="bg-[#0C831F] text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          {/* Wishlist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Image */}
                <div className="relative bg-gray-50 p-4 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 object-contain"
                  />

                  <button
                    onClick={() =>
                      handleRemoveItem(
                        item.id,
                        item.productId
                      )
                    }
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>

                {/* Info */}
                <div className="px-3 py-2">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-green-700 font-semibold mt-1">
                    <Clock className="w-3 h-3" />
                    10–15 mins
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/product/${item.productId}`)
                      }
                      className="border border-[#0C831F] text-[#0C831F] px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#0C831F] hover:text-white transition"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex gap-3">
            <button
              onClick={handleClearAll}
              className="flex-1 border border-red-200 text-red-600 py-2 rounded-xl font-semibold"
            >
              Clear All
            </button>
            <Link
              to="/products"
              className="flex-1 bg-[#0C831F] text-white py-2 rounded-xl font-semibold text-center"
            >
              Shop Now
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
