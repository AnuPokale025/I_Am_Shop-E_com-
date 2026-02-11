import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import apiClient from "../../api/axios";
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

  /* ================= RELATED PRODUCTS ================= */
  const [relatedProducts, setRelatedProducts] = useState([]);

  /* ================= REVIEWS ================= */
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      const data = res.data;
      setProduct(data);

      if (data.images?.length > 0) {
        setSelectedImage(data.images[0].imageUrl);
      }

      fetchRelatedProducts(data.categoryId);
      fetchReviews(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH RELATED PRODUCTS ================= */
  const fetchRelatedProducts = async (categoryId) => {
    if (!categoryId) return;

    try {
      const res = await apiClient.get("/products/related", {
        params: {
          categoryId,
          page: 0,
          size: 4,
        },
      });

      setRelatedProducts(res.data.content || res.data || []);
    } catch (err) {
      console.error("Related products error:", err);
    }
  };

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async (page = 0) => {
    try {
      const res = await apiClient.get(`/products/${id}/reviews`, {
        params: { page, size: 5 },
      });

      setReviews(res.data.content || res.data || []);
      setReviewTotalPages(res.data.totalPages || 1);
      setReviewPage(page);
    } catch (err) {
      console.error("Review fetch error:", err);
    }
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = async () => {
    if (!newReview.comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      await apiClient.post(`/products/${id}/reviews`, newReview);
      setNewReview({ rating: 5, comment: "" });
      fetchReviews(0);
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  /* ================= ADD TO CART ================= */
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
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <div className="bg-white p-4 flex items-center gap-3 shadow sticky top-0 z-50">
        <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h1 className="font-bold">Product Details</h1>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="bg-white rounded-2xl p-6">
          <img
            src={selectedImage || "/placeholder.png"}
            className="w-full h-80 object-contain"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img) => (
              <img
                key={img.id}
                src={img.imageUrl}
                onClick={() => setSelectedImage(img.imageUrl)}
                className={`h-16 w-16 object-contain border rounded-lg cursor-pointer ${
                  selectedImage === img.imageUrl
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.price}
            </span>
            {product.mrp && (
              <span className="line-through text-gray-400">
                ₹{product.mrp}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-red-500 font-semibold">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border rounded"
            >
              <Minus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() =>
                setQuantity(Math.min(product.quantity, quantity + 1))
              }
              className="p-2 border rounded"
            >
              <Plus />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
          >
            <ShoppingCart className="inline mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mt-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp /> Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white p-4 rounded-xl cursor-pointer"
              >
                <img
                  src={p.images?.[0]?.imageUrl || "/placeholder.png"}
                  className="h-32 w-full object-contain mb-2"
                />
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="font-bold text-green-600">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= REVIEWS ================= */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {/* Add Review */}
        <div className="bg-white p-4 rounded-xl mb-6">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <Star
                key={r}
                onClick={() =>
                  setNewReview({ ...newReview, rating: r })
                }
                className={`cursor-pointer ${
                  r <= newReview.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full border rounded-lg p-2"
            placeholder="Write your review..."
          />

          <button
            onClick={submitReview}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </div>

        {/* Review List */}
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl mb-3">
            <p className="font-semibold">{r.userName}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < r.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm mt-1">{r.comment}</p>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={reviewPage === 0}
            onClick={() => fetchReviews(reviewPage - 1)}
          >
            Prev
          </button>
          <span>
            {reviewPage + 1} / {reviewTotalPages}
          </span>
          <button
            disabled={reviewPage + 1 >= reviewTotalPages}
            onClick={() => fetchReviews(reviewPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
