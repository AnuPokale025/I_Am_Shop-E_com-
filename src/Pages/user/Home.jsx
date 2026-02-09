import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, MapPin, Filter, Star, Truck, Shield, RotateCcw, Zap, Clock, Package, Leaf, Award, Users, TrendingUp, Sparkles } from 'lucide-react';
import { categoryData } from '../Categories';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        fetch('https://iamashop-production.up.railway.app/api/categories'),
        fetch('https://iamashop-production.up.railway.app/api/products')
      ]);
      
      if (categoriesResponse.ok && productsResponse.ok) {
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json()
        ]);
        
        const categoriesArray = Array.isArray(categoriesData) ? categoriesData : [];
        const productsArray = Array.isArray(productsData) ? productsData : [];
        
        const mappedCategories = categoriesArray.map(cat => ({
          ...cat,
          img: cat.img || cat.image || cat.imageUrl,
          image: cat.img || cat.image || cat.imageUrl
        }));
        
        setCategories(mappedCategories);
        setFeaturedProducts(productsArray);
      } else {
        const mappedCategories = categoryData.map(cat => ({
          ...cat,
          img: cat.img || cat.image || cat.imageUrl,
          image: cat.img || cat.image || cat.imageUrl
        }));
        setCategories(mappedCategories);
        
        const productsResponse = await fetch('https://iamashop-production.up.railway.app/api/products');
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setFeaturedProducts(Array.isArray(productsData) ? productsData : []);
        } else {
          setFeaturedProducts([
            { id: 1, name: 'Organic Apples', category: 'Fruits', price: 120, originalPrice: 150, discount: 20, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300', rating: 4.5, reviews: 128 },
            { id: 2, name: 'Fresh Milk', category: 'Dairy', price: 65, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300', rating: 4.8, reviews: 89 },
            { id: 3, name: 'Whole Wheat Bread', category: 'Bakery', price: 45, originalPrice: 50, discount: 10, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', rating: 4.2, reviews: 67 },
            { id: 4, name: 'Orange Juice', category: 'Beverages', price: 85, image: 'https://images.unsplash.com/photo-1542837308-e3d7b1e0c9d2?w=300', rating: 4.6, reviews: 156 }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      const mappedCategories = categoryData.map(cat => ({
        ...cat,
        img: cat.img || cat.image || cat.imageUrl,
        image: cat.img || cat.image || cat.imageUrl
      }));
      setCategories(mappedCategories);
      setFeaturedProducts([
        { id: 1, name: 'Organic Apples', category: 'Fruits', price: 120, originalPrice: 150, discount: 20, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300', rating: 4.5, reviews: 128 },
        { id: 2, name: 'Fresh Milk', category: 'Dairy', price: 65, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300', rating: 4.8, reviews: 89 },
        { id: 3, name: 'Whole Wheat Bread', category: 'Bakery', price: 45, originalPrice: 50, discount: 10, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', rating: 4.2, reviews: 67 },
        { id: 4, name: 'Orange Juice', category: 'Beverages', price: 85, image: 'https://images.unsplash.com/photo-1542837308-e3d7b1e0c9d2?w=300', rating: 4.6, reviews: 156 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await fetch(`https://iamashop-production.up.railway.app/api/products/search?q=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium"></p>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blinkit Style */}
      <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-semibold">Fastest Delivery in Minutes</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              India's last minute app
            </h1>
            <p className="text-xl md:text-2xl text-green-50 mb-8">
              Get groceries & essentials delivered in minutes
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Clock className="h-6 w-6 mx-auto mb-2" />
                <p className="font-bold text-lg">10 mins</p>
                <p className="text-xs text-green-50">Delivery</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Shield className="h-6 w-6 mx-auto mb-2" />
                <p className="font-bold text-lg">100%</p>
                <p className="text-xs text-green-50">Quality</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Star className="h-6 w-6 mx-auto mb-2 fill-current" />
                <p className="font-bold text-lg">4.5+</p>
                <p className="text-xs text-green-50">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Explore Our Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From farm-fresh fruits to daily essentials, discover everything you need in one place. 
              Shop across 12+ categories with over 5,000 handpicked products.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-purple-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Fresh Produce</h3>
              <p className="text-sm text-gray-600">Farm to door in hours</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-purple-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Groceries</h3>
              <p className="text-sm text-gray-600">All daily essentials</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-purple-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Personal Care</h3>
              <p className="text-sm text-gray-600">Beauty & wellness</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Premium Brands</h3>
              <p className="text-sm text-gray-600">Top quality picks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/categories" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.slice(0, 12).map((category, index) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform overflow-hidden">
                  <img 
                    src={category.img || category.image} 
                    alt={category.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors line-clamp-2">
                  {category.name}
                </h3>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No categories available</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Banner */}
      <div className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">10-Minute Delivery</h3>
                <p className="text-gray-600 text-sm">Super fast delivery to your door</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Best Prices & Offers</h3>
                <p className="text-gray-600 text-sm">Cheaper prices than your local shop</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <RotateCcw className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Wide Assortment</h3>
                <p className="text-gray-600 text-sm">Choose from 5000+ products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose Our Products?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We carefully select every product to ensure you get the best quality, freshness, and value. 
              Our commitment to excellence means you can shop with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Fresh Guarantee</h3>
              <p className="text-gray-600">
                All our fruits, vegetables, and dairy products are sourced daily from trusted farms. 
                We guarantee farm-fresh quality or your money back.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Certified</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous quality checks. We partner with certified brands 
                and verify all products meet safety standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Value Pricing</h3>
              <p className="text-gray-600">
                Save up to 30% compared to local stores. Our bulk purchasing power means 
                better prices for you without compromising quality.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-blue-100">
              <p className="text-3xl font-bold text-green-600 mb-1">5000+</p>
              <p className="text-sm text-gray-600">Products Available</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-blue-100">
              <p className="text-3xl font-bold text-blue-600 mb-1">50K+</p>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-blue-100">
              <p className="text-3xl font-bold text-orange-600 mb-1">12+</p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-blue-100">
              <p className="text-3xl font-bold text-purple-600 mb-1">4.5★</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 text-sm mt-1">Handpicked selections just for you</p>
          </div>
          <Link 
            to="/products" 
            className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.isArray(featuredProducts) && featuredProducts.length > 0 ? (
            featuredProducts.slice(0, 10).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                      {product.discount}% OFF
                    </div>
                  )}
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors text-sm line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  
                  {product.rating && (
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through ml-1">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleAddClick(e, product.id)} 
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors shadow-sm"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No featured products available</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Trust Section */}
      <div className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600">Join our growing community of happy shoppers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">50,000+</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
              <p className="text-gray-700">
                Thousands of families trust us for their daily grocery needs. Join the community today!
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-8 w-8 text-blue-600 fill-current" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.5/5</p>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
              </div>
              <p className="text-gray-700">
                Consistently rated excellent by our customers for quality, service, and delivery speed.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">1M+</p>
                  <p className="text-sm text-gray-600">Orders Delivered</p>
                </div>
              </div>
              <p className="text-gray-700">
                Over a million orders successfully delivered with 99.5% on-time delivery rate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download App Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">Download the App</h2>
              <p className="text-green-50 text-lg mb-6">
                Get exclusive offers and faster checkout
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  App Store
                </button>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Play Store
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons - Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden flex flex-col gap-3 z-50">
        <Link
          to="/cart"
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <ShoppingCart className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default Home;