import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Package, DollarSign, Image as ImageIcon, ArrowLeft, X } from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    mrp: "",
    quantity: "",
    discount: "",
    brand: "",
    slug: "",
    images: []
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await vendorAPI.getCategories();
      setCategories(response);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Create Product First
      const productPayload = {
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        price: formData.price,
        mrp: formData.mrp,
        quantity: formData.quantity,
        discount: formData.discount,
        brand: formData.brand,
        slug: formData.slug
      };

      const createdProduct = await vendorAPI.createProduct(productPayload);

      const productId =
        createdProduct?.id ||
        createdProduct?._id ||
        createdProduct?.product?.id;

      if (!productId) {
        throw new Error("Product ID not returned");
      }

      // 2️⃣ Upload Images Using addImage API
      if (formData.images.length > 0) {
        await Promise.all(
          formData.images.map((img) =>
            vendorAPI.addImage(productId, img)
          )
        );
      }

      navigate("/vendor/products");

    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Add Product
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Package className="mr-2 h-5 w-5 text-indigo-600" />
              Product Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.categoryId || cat._id} value={cat.id || cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-indigo-600" />
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Selling Price"
                className="px-4 py-2 border rounded-lg"
              />

              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                placeholder="MRP"
                className="px-4 py-2 border rounded-lg"
              />

              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <ImageIcon className="mr-2 h-5 w-5 text-indigo-600" />
              Product Images
            </h2>

            <div className="flex justify-center px-6 py-10 border-2 border-dashed rounded-lg mb-6">
              <label className="cursor-pointer text-indigo-600 font-medium">
                Upload images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {imagePreviews.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-indigo-600 text-white rounded-lg"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
