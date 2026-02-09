import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Save } from "lucide-react";
import vendorAPI from "../../api/vendor.api";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE CHANGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("slug", formData.slug);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await vendorAPI.createCategory(payload);

      navigate("/vendor/categories");
    } catch (err) {
      console.error(err);
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-5 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="text-xl font-bold">Add Category</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 space-y-6"
      >
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* CATEGORY INFO */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-semibold mb-4">Category Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Category name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="category-slug"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* IMAGE */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-semibold mb-4">Category Image</h2>

          <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
            <Upload className="mx-auto mb-2" />
            <span className="text-sm">
              {preview ? "Change image" : "Upload image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Category Preview"
                className="h-40 w-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/vendor/categories")}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
