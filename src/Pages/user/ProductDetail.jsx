import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  ShoppingCartIcon,
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
  const [adding, setAdding] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProductById(id);

      setProduct(data);
      setQuantity(1);

      if (data?.images?.length > 0) {
        setSelectedImage(data.images[0].imageUrl);
      }

      fetchReviews(0);
    } catch (error) {
      console.error("Product fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH REVIEWS =================
  const fetchReviews = async (page = 0) => {
    try {
      const response = await productAPI.getFeedback(id, page, 5);

      if (Array.isArray(response)) {
        setReviews(response);
        setReviewTotalPages(1);
      } else {
        setReviews(response?.content || []);
        setReviewTotalPages(response?.totalPages || 1);
      }

      setReviewPage(page);
    } catch (error) {
      console.error("Review fetch error:", error);
      setReviews([]);
    }
  };

  // ================= SUBMIT REVIEW =================
  const submitReview = async () => {
    if (!newReview.comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setSubmittingReview(true);

      const response = await productAPI.addFeedback(id, newReview);

      // Add newly created review properly (not fake optimistic only)
      setReviews((prev) => [
        {
          rating: newReview.rating,
          comment: newReview.comment,
          ...response,
        },
        ...prev,
      ]);

      setNewReview({ rating: 5, comment: "" });
    } catch (error) {
      alert("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  // ================= ADD TO CART =================
  const handleAddToCart = async () => {
    if (adding) return;

    try {
      setAdding(true);

      await cartAPI.addToCart(product.id || product._id, quantity);

      addToCart(product, quantity);

      navigate("/cart");
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
     <div className="min-h-screen flex justify-center items-center bg-slate-50">
             <div className="text-center">
               <div className="relative">
                 <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
                 <ShoppingCartIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600" size={28} />
               </div>
               <p className="mt-4 text-slate-600 font-medium">Loading your product details...</p>
             </div>
           </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product not found
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="w-screen min-h-screen bg-gray-50 overflow-x-hidden pb-20">

      {/* HEADER */}
      <div className="w-full bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-50">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <h1 className="font-semibold text-lg">Product Details</h1>
      </div>

      {/* MAIN SECTION */}
      <div className="w-full px-8 py-10 grid md:grid-cols-2 gap-12">

        {/* IMAGE SECTION */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="h-[500px] flex items-center justify-center bg-gray-50 rounded-xl">
            <img
              src={selectedImage || "/placeholder.png"}
              alt={product.name}
              className="max-h-[420px] object-contain"
            />
          </div>

          <div className="flex gap-4 mt-6 overflow-x-auto">
            {product.images?.map((img) => (
              <img
                key={img.id}
                src={img.imageUrl}
                alt=""
                onClick={() => setSelectedImage(img.imageUrl)}
                className={`h-20 w-20 object-contain border rounded-lg cursor-pointer p-2 transition ${
                  selectedImage === img.imageUrl
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">

          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-end gap-6 mb-8">
            <span className="text-4xl font-bold text-green-600">
              ₹{product.price}
            </span>

            {product.mrp && (
              <span className="line-through text-gray-400 text-xl">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-6 mb-10">
            <span className="font-semibold text-lg">Quantity</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200"
              >
                <Minus size={18} />
              </button>

              <span className="px-8 font-semibold text-lg">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(product.quantity || 10, prev + 1)
                  )
                }
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition"
          >
            {adding ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart size={20} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="w-full px-8 pb-20">
        <div className="bg-white rounded-2xl p-8 shadow-sm">

          <h3 className="text-2xl font-semibold mb-6">
            Customer Reviews
          </h3>

          {/* Add Review */}
          <div className="mb-8 border p-6 rounded-lg bg-gray-50">
            <div className="flex gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  onClick={() =>
                    setNewReview({ ...newReview, rating: star })
                  }
                  className={`cursor-pointer ${
                    star <= newReview.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({
                  ...newReview,
                  comment: e.target.value,
                })
              }
              placeholder="Write your review..."
              className="w-full border rounded-lg p-4 mb-4"
              rows={4}
            />

            <button
              onClick={submitReview}
              disabled={submittingReview}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          {/* Review List */}
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="border-b py-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating || 0)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
