import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, 
  Plus, 
  Minus,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  Package,
  Leaf,
  Award,
  CheckCircle,
  Info,
  ArrowLeft,
  ShoppingCart,
  Zap,
  Timer,
  TrendingUp
} from "lucide-react";
import apiClient from "../../api/axios";
import cartAPI from "../../api/cart.api";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart: addToLocalCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('details');

  /* ================= FETCH PRODUCT (AXIOS) ================= */
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("❌ Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD TO CART ================= */
  const handleAddClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;

    setAdding(true);
    try {
      // 🔥 Backend cart API
      const cartRes = await cartAPI.addToCart(product.id, quantity);

      // 🔥 Frontend cart state
      addToLocalCart(product, quantity);

      navigate("/cart", { state: { cart: cartRes } });
    } catch (err) {
      console.error("❌ Add to cart failed", err);
      alert("Failed to add product to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} for just ₹${product.price}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! 📋");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details... 🛍️</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found 😕</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  // Static product benefits/features
  const benefits = [
    { icon: Truck, text: "10-Min Delivery", color: "green" },
    { icon: Shield, text: "Quality Assured", color: "blue" },
    { icon: Leaf, text: "100% Fresh", color: "emerald" },
    { icon: Award, text: "Top Rated", color: "yellow" },
  ];

  const rating = product.rating || 4.5;
  const reviews = product.reviews || 156;
  const discount = product.discount || 0;
  const originalPrice = product.originalPrice || null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900 flex-1 mx-4 truncate">
            Product Details
          </h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-3xl p-8 relative overflow-hidden shadow-sm border border-gray-100">
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg z-10">
                  {discount}% OFF 🔥
                </div>
              )}
              
              <div className="flex items-center justify-center min-h-[400px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md h-auto object-contain"
                />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm"
                >
                  <div className={`w-10 h-10 bg-${benefit.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <benefit.icon className={`w-5 h-5 text-${benefit.color}-600`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-5">
            {/* Product Header */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-2">
                    {product.category} 🏷️
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-lg">
                      Save ₹{originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Lightning Fast Delivery ⚡</p>
                    <p className="text-sm text-gray-600">
                      Get it in <span className="font-semibold text-green-700">10-15 minutes</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    
                    <span className="font-bold text-xl text-gray-900 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-green-600 border border-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Total: <span className="font-bold text-lg text-gray-900">₹{product.price * quantity}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={adding}
                onClick={handleAddClick}
                className="w-full mt-5 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-xl text-lg font-bold hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {adding ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setSelectedTab('details')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    selectedTab === 'details'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  📋 Details
                </button>
                <button
                  onClick={() => setSelectedTab('benefits')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    selectedTab === 'benefits'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  ✨ Benefits
                </button>
                <button
                  onClick={() => setSelectedTab('info')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    selectedTab === 'info'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  ℹ️ Info
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {selectedTab === 'details' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Product Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description || 
                        "Premium quality product carefully selected for you. Fresh, nutritious, and packed with essential vitamins and minerals. Perfect for daily consumption and healthy living. 🌟"
                      }
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">Category</p>
                        <p className="font-semibold text-gray-900">{product.category}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">Brand</p>
                        <p className="font-semibold text-gray-900">{product.brand || "Premium"}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">Weight/Size</p>
                        <p className="font-semibold text-gray-900">{product.weight || "1 kg"}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">Stock</p>
                        <p className="font-semibold text-green-600">In Stock ✓</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'benefits' && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Why Choose This Product?</h3>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">100% Fresh & Quality Assured</p>
                        <p className="text-sm text-gray-600">
                          Every product undergoes strict quality checks to ensure you get only the best. 🌟
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Farm Fresh Delivery</p>
                        <p className="text-sm text-gray-600">
                          Sourced directly from trusted farms and delivered to your doorstep in minutes. 🚜
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Best Price Guarantee</p>
                        <p className="text-sm text-gray-600">
                          Get the best value for your money with our competitive pricing. 💰
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Easy Returns</p>
                        <p className="text-sm text-gray-600">
                          Not satisfied? Get a hassle-free refund or replacement. 🔄
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'info' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Important Information</h3>
                    
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Storage Instructions</p>
                          <p className="text-sm text-gray-700">
                            Store in a cool, dry place away from direct sunlight. Refrigerate after opening if applicable. 🧊
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Quality Guarantee</p>
                          <p className="text-sm text-gray-700">
                            We guarantee 100% quality or your money back. Your satisfaction is our priority! ✅
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-start gap-3">
                        <Timer className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Shelf Life</p>
                          <p className="text-sm text-gray-700">
                            Best before date printed on package. Consume within recommended timeframe for optimal freshness. 📅
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Reviews Summary */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 border border-yellow-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                Customer Reviews
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{rating}</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{reviews}</p>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">98%</p>
                  <p className="text-sm text-gray-600">Recommended</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-700 italic">
                  "Great product! Fresh and delivered quickly. Highly recommend!" ⭐⭐⭐⭐⭐
                </p>
                <p className="text-xs text-gray-500 mt-2">- Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;