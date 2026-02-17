import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star, Clock, ShoppingCart, User } from "lucide-react";
import axios from "axios";
import wishlistAPI from "../../api/wishlist.api";

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

const Product = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
    loadWishlist();
  }, []);

  /* ================= SMART CACHE CHECK ================= */

  const isCacheValid = (key) => {
    const cacheTime = localStorage.getItem(`${key}_time`);
    if (!cacheTime) return false;

    const now = Date.now();
    return now - parseInt(cacheTime) < CACHE_TIME;
  };

  /* ================= LOAD PRODUCTS ================= */

  const loadProducts = async () => {
    try {
      const cachedProducts = localStorage.getItem("products");

      if (cachedProducts && isCacheValid("products")) {
        setFeaturedProducts(JSON.parse(cachedProducts));
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "https://iamashop-production.up.railway.app/api/products"
      );

      const products = Array.isArray(res.data) ? res.data : [];

      setFeaturedProducts(products);

      // Save to cache
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("products_time", Date.now().toString());

    } catch (error) {
      console.error("Product fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD WISHLIST ================= */

  const loadWishlist = async () => {
    try {
      const cachedWishlist = localStorage.getItem("wishlist");

      if (cachedWishlist && isCacheValid("wishlist")) {
        setWishlistIds(JSON.parse(cachedWishlist));
        return;
      }

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

      // Save to cache
      localStorage.setItem("wishlist", JSON.stringify(ids));
      localStorage.setItem("wishlist_time", Date.now().toString());

    } catch (err) {
      console.error("Wishlist load failed", err);
    }
  };

  /* ================= GET IMAGE ================= */

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

  /* ================= HANDLE ADD ================= */

  const handleAddClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  /* ================= HANDLE WISHLIST ================= */

  const handleWishlistClick = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const isLiked = wishlistIds.includes(productId);

    try {
      let updatedIds;

      if (isLiked) {
        await wishlistAPI.removeFromWishlist(productId);
        updatedIds = wishlistIds.filter((id) => id !== productId);
      } else {
        await wishlistAPI.addToWishlist(productId);
        updatedIds = [...wishlistIds, productId];
      }

      setWishlistIds(updatedIds);

      // Update cache instantly
      localStorage.setItem("wishlist", JSON.stringify(updatedIds));
      localStorage.setItem("wishlist_time", Date.now().toString());

    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F2]">
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Order in 10 minutes ⚡
        </h2>
        <p className="text-sm text-gray-500">
          Fresh groceries delivered fast
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-24">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative bg-gray-50 p-3 flex justify-center">
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="h-28 object-contain"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />

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

            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {product.name}
              </p>

              <div className="flex items-center gap-1 text-xs text-green-700 font-semibold mt-1">
                <Clock className="w-3 h-3" />
                10–15 mins
              </div>

              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-500">4.5</span>
              </div>

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
