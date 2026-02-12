import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, Package, DollarSign, Image as ImageIcon, ArrowLeft, X } from 'lucide-react';
import vendorAPI from '../../api/vendor.api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    mrp: '',
    quantity: '',
    discount: '',
    brand: '',
    slug: '',
    images: [] // Holds {id, imageUrl} for existing OR File objects for new
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await vendorAPI.getProductById(id);
      
      setFormData({
        name: response.name || '',
        description: response.description || '',
        categoryId: response.categoryId || '', 
        price: response.price || '',
        mrp: response.mrp || '',
        quantity: response.quantity || '',
        discount: response.discount || '',
        brand: response.brand || '',
        slug: response.slug || '',
        images: response.images || [] 
      });

      const existingUrls = response.images?.map(img => img.imageUrl) || [];
      setImagePreviews(existingUrls);
    } catch (err) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await vendorAPI.getCategories();
      setCategories(response);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      // Add File object to state
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, file]
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = new FormData();

      // Basic fields mapping to your shared JSON structure
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('categoryId', formData.categoryId);
      data.append('slug', formData.slug);
      data.append('price', formData.price);
      data.append('mrp', formData.mrp);
      data.append('quantity', formData.quantity);
      data.append('discount', formData.discount);
      data.append('brand', formData.brand);

      // --- IMAGE LOGIC FIX ---
      formData.images.forEach((img) => {
        if (img instanceof File) {
          // New file upload: Field name must match backend (e.g., 'images')
          data.append('images', img);
        } else if (img.id) {
          // Existing image: Send the ID so the backend knows to keep it
          data.append('existingImageIds', img.id);
        }
      });

      await vendorAPI.updateProduct(id, data);
      navigate('/vendor/products');
    } catch (err) {
      console.error("Update error:", err);
      setError(err?.response?.data?.message || 'Failed to update product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Information Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Package className="mr-2 h-5 w-5 text-indigo-600" /> Product Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg outline-none">
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-indigo-600" /> Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Selling Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">MRP</label>
                <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Discount (%)</label>
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <ImageIcon className="mr-2 h-5 w-5 text-indigo-600" /> Product Images
            </h2>
            <div className="flex justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg mb-6 hover:border-indigo-400 transition-colors">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <label className="cursor-pointer text-indigo-600 font-medium mt-2 block">
                  <span>Upload new images</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {imagePreviews.map((url, index) => (
                <div key={index} className="relative group aspect-square">
                  <img src={url} alt="preview" className="w-full h-full object-cover rounded-lg border shadow-sm" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button 
              type="submit" 
              disabled={saving} 
              className="px-8 py-2 bg-indigo-600 text-white rounded-lg flex items-center font-medium hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
            >
              {saving ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;