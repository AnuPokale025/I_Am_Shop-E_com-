import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

import productAPI from "../../api/product.api";
import cartAPI from "../../api/cart.api";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "instant" });
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProductById(id);
      setProduct(data);

      if (data?.images?.length > 0) {
        setSelectedImage(data.images[0].imageUrl);
      }

      fetchReviews(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (page = 0) => {
    try {
      const data = await productAPI.getFeedback(id, page, 5);
      setReviews(data.content || data);
      setReviewTotalPages(data.totalPages || 1);
      setReviewPage(page);
    } catch (err) {
      console.error("Review fetch error:", err);
    }
  };

  const submitReview = async () => {
    if (!newReview.comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      await productAPI.addFeedback(id, newReview);
      setNewReview({ rating: 5, comment: "" });
      fetchReviews(0);
    } catch {
      alert("Failed to submit review");
    }
  };

  const handleAddToCart = async () => {
    try {
      await cartAPI.addToCart(product.id, quantity);
      addToCart(product, quantity);
      navigate("/cart");
    } catch {
      alert("Failed to add to cart");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* HEADER - Increased z-index to stay on top */}
      <div className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-[60]">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <h1 className="font-semibold text-lg">Product Details</h1>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8 items-start">
        
        {/* IMAGE SECTION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="h-96 flex items-center justify-center bg-gray-50 rounded-xl">
            <img
              src={selectedImage || "/placeholder.png"}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img) => (
              <img
                key={img.id}
                src={img.imageUrl}
                alt=""
                onClick={() => setSelectedImage(img.imageUrl)}
                className={`h-16 w-16 object-contain border rounded-lg cursor-pointer p-1 transition ${
                  selectedImage === img.imageUrl
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO STICKY - Lower z-index and adjusted top offset */}
        <div className="relative">
          <div className="md:sticky md:top-20 z-10"> 
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
              
              <h2 className="text-2xl font-bold mb-3">
                {product.name}
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* PRICE */}
              <div className="flex items-end gap-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                {product.mrp && (
                  <span className="line-through text-gray-400">
                    ₹{product.mrp}
                  </span>
                )}
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-medium">Quantity</span>

                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-5 font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(product.quantity || 10, quantity + 1)
                      )
                    }
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

          {reviews.map((review, index) => (
            <div key={index} className="border-b py-4">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}

          {reviewTotalPages > 1 && (
            <div className="flex justify-between mt-4">
              <button
                disabled={reviewPage === 0}
                onClick={() => fetchReviews(reviewPage - 1)}
                className="px-4 py-2 bg-gray-100 rounded"
              >
                Prev
              </button>
              <button
                disabled={reviewPage + 1 >= reviewTotalPages}
                onClick={() => fetchReviews(reviewPage + 1)}
                className="px-4 py-2 bg-gray-100 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;