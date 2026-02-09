import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Package,
  Tag,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    originalPrice: "",
    stock: "",
    discount: "",
    brand: "",
    images: [],
  });

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await vendorAPI.getCategories();
      const list = Array.isArray(res) ? res : res?.categories || [];
      setCategories(list);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    }
  };

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("categoryId", formData.categoryId);
      payload.append("price", formData.price);
      payload.append("originalPrice", formData.originalPrice || "");
      payload.append("stock", formData.stock);
      payload.append("discount", formData.discount || 0);
      payload.append("brand", formData.brand);

      formData.images.forEach((img) => {
        payload.append("images", img);
      });

      await vendorAPI.createProduct(payload);

      navigate("/vendor/products");
    } catch (err) {
      console.error(err);
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm px-6 py-5">
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 space-y-8"
      >
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* PRODUCT INFO */}
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Product Info</h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Product name"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Product description"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id || c.id} value={c._id || c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="px-4 py-3 border rounded-lg"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder="Stock"
              className="px-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* PRICING */}
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Pricing</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Price"
              className="px-4 py-3 border rounded-lg"
            />

            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="Original Price"
              className="px-4 py-3 border rounded-lg"
            />

            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Discount %"
              className="px-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* IMAGES */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <ImageIcon size={18} /> Product Images
          </h2>

          <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
            <Upload className="mx-auto mb-2" />
            <span className="text-sm">Upload images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt="preview"
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/vendor/products")}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
          >
            <Package size={18} />
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
