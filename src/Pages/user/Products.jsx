import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star, Clock, ShoppingCart, User } from "lucide-react";
import axios from "axios";
import wishlistAPI from "../../api/wishlist.api";

const Product = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await wishlistAPI.getWishlist();
      const data = res?.data || res;
      let items = [];

      if (Array.isArray(data)) items = data;
      else if (Array.isArray(data?.items)) items = data.items;
      else if (Array.isArray(data?.wishlist)) items = data.wishlist;

      const ids = items
        .map((i) => i.product?.id || i.productId || i.id)
        .filter(Boolean);

      setWishlistIds(ids);
    } catch (err) {
      console.error("Wishlist load failed", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://iamashop-production.up.railway.app/api/products"
      );
      setFeaturedProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  const handleWishlistClick = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const isLiked = wishlistIds.includes(productId);
    try {
      if (isLiked) {
        await wishlistAPI.removeFromWishlist(productId);
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
      } else {
        await wishlistAPI.addToWishlist(productId);
        setWishlistIds((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  /* ===== Skeleton Loader ===== */
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-56 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F2]">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Order in 10 minutes ⚡
        </h2>
        <p className="text-sm text-gray-500">
          Fresh groceries delivered fast
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-24">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative bg-gray-50 p-3 flex justify-center">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="h-28 object-contain"
              />

              {/* Wishlist */}
              <button
                onClick={(e) => handleWishlistClick(e, product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
              >
                <Heart
                  className={`h-4 w-4 ${
                    wishlistIds.includes(product.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Info */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {product.name}
              </p>

              {/* Delivery */}
              <div className="flex items-center gap-1 text-xs text-green-700 font-semibold mt-1">
                <Clock className="w-3 h-3" />
                10–15 mins
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-500">
                  {product.rating || 4.5}
                </span>
              </div>

              {/* Price + Add */}
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-gray-900">
                  ₹{product.price}
                </span>

                <button
                  onClick={(e) => handleAddClick(e, product.id)}
                  className="border border-[#0C831F] text-[#0C831F] px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#0C831F] hover:text-white transition"
                >
                  ADD
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Buttons (Mobile) */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 md:hidden">
        <Link
          to="/cart"
          className="bg-[#0C831F] p-4 rounded-full text-white shadow-lg"
        >
          <ShoppingCart />
        </Link>
        <Link
          to="/profile"
          className="bg-white p-4 rounded-full shadow border"
        >
          <User />
        </Link>
      </div>
    </div>
  );
};

export default Product;
