import React, { useState } from 'react';
import { Plus, Edit, Trash2, ChevronRight } from 'lucide-react';

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Dairy, Bread & Eggs",
      slug: "dairy-bread-eggs",
      subcategories: [
        { id: 101, name: "Milk", slug: "milk" },
        { id: 102, name: "Curd & Yogurt", slug: "curd-yogurt" },
        { id: 103, name: "Cheese", slug: "cheese" },
        { id: 104, name: "Bread & Buns", slug: "bread-buns" },
        { id: 105, name: "Eggs", slug: "eggs" }
      ]
    },
    {
      id: 2,
      name: "Cold Drinks & Juices",
      slug: "cold-drinks-juices",
      subcategories: [
        { id: 201, name: "Soft Drinks", slug: "soft-drinks" },
        { id: 202, name: "Fruit Juices", slug: "fruit-juices" },
        { id: 203, name: "Energy Drinks", slug: "energy-drinks" },
        { id: 204, name: "Mineral Water", slug: "mineral-water" }
      ]
    },
    {
      id: 3,
      name: "Snacks & Munchies",
      slug: "snacks-munchies",
      subcategories: [
        { id: 301, name: "Chips & Crisps", slug: "chips-crisps" },
        { id: 302, name: "Biscuits & Cookies", slug: "biscuits-cookies" },
        { id: 303, name: "Namkeen", slug: "namkeen" },
        { id: 304, name: "Popcorn", slug: "popcorn" },
        { id: 305, name: "Nuts & Dry Fruits", slug: "nuts-dry-fruits" }
      ]
    },
    {
      id: 4,
      name: "Baby Care",
      slug: "baby-care",
      subcategories: [
        { id: 401, name: "Diapers", slug: "diapers" },
        { id: 402, name: "Baby Food", slug: "baby-food" },
        { id: 403, name: "Baby Care", slug: "baby-care-products" },
        { id: 404, name: "Baby Accessories", slug: "baby-accessories" }
      ]
    },
    {
      id: 5,
      name: "Cleaning Essentials",
      slug: "cleaning-essentials",
      subcategories: [
        { id: 501, name: "Detergents", slug: "detergents" },
        { id: 502, name: "Floor Cleaners", slug: "floor-cleaners" },
        { id: 503, name: "Bathroom Cleaners", slug: "bathroom-cleaners" },
        { id: 504, name: "Kitchen Cleaners", slug: "kitchen-cleaners" }
      ]
    },
    {
      id: 6,
      name: "Home & Office",
      slug: "home-office",
      subcategories: [
        { id: 601, name: "Stationery", slug: "stationery" },
        { id: 602, name: "Kitchenware", slug: "kitchenware" },
        { id: 603, name: "Home Decor", slug: "home-decor" },
        { id: 604, name: "Storage", slug: "storage" }
      ]
    },
    {
      id: 7,
      name: "Organic Products",
      slug: "organic-products",
      subcategories: [
        { id: 701, name: "Organic Food", slug: "organic-food" },
        { id: 702, name: "Organic Spices", slug: "organic-spices" },
        { id: 703, name: "Organic Flours", slug: "organic-flours" }
      ]
    },
    {
      id: 8,
      name: "Breakfast & Instant Food",
      slug: "breakfast-instant-food",
      subcategories: [
        { id: 801, name: "Cereals", slug: "cereals" },
        { id: 802, name: "Instant Noodles", slug: "instant-noodles" },
        { id: 803, name: "Breakfast Mixes", slug: "breakfast-mixes" },
        { id: 804, name: "Oats", slug: "oats" }
      ]
    },
    {
      id: 9,
      name: "Masala & Spices",
      slug: "masala-spices",
      subcategories: [
        { id: 901, name: "Whole Spices", slug: "whole-spices" },
        { id: 902, name: "Ground Spices", slug: "ground-spices" },
        { id: 903, name: "Blended Masalas", slug: "blended-masalas" },
        { id: 904, name: "Herbs", slug: "herbs" }
      ]
    },
    {
      id: 10,
      name: "Ata & Flours",
      slug: "ata-flours",
      subcategories: [
        { id: 1001, name: "Wheat Flour", slug: "wheat-flour" },
        { id: 1002, name: "Rice Flour", slug: "rice-flour" },
        { id: 1003, name: "Besan", slug: "besan" },
        { id: 1004, name: "Maida", slug: "maida" }
      ]
    },
    {
      id: 11,
      name: "Sauces & Spreads",
      slug: "sauces-spreads",
      subcategories: [
        { id: 1101, name: "Ketchup", slug: "ketchup" },
        { id: 1102, name: "Mayonnaise", slug: "mayonnaise" },
        { id: 1103, name: "Honey", slug: "honey" },
        { id: 1104, name: "Jam & Spreads", slug: "jam-spreads" }
      ]
    },
    {
      id: 12,
      name: "Pet Care",
      slug: "pet-care",
      subcategories: [
        { id: 1201, name: "Dog Food", slug: "dog-food" },
        { id: 1202, name: "Cat Food", slug: "cat-food" },
        { id: 1203, name: "Pet Accessories", slug: "pet-accessories" }
      ]
    },
    {
      id: 13,
      name: "Chicken, Meat & Fish",
      slug: "chicken-meat-fish",
      subcategories: [
        { id: 1301, name: "Chicken", slug: "chicken" },
        { id: 1302, name: "Mutton", slug: "mutton" },
        { id: 1303, name: "Fish", slug: "fish" },
        { id: 1304, name: "Frozen Meat", slug: "frozen-meat" }
      ]
    }
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [newSubcategory, setNewSubcategory] = useState({ categoryId: null, name: '', slug: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.slug) {
      const category = {
        id: Date.now(),
        name: newCategory.name,
        slug: newCategory.slug,
        subcategories: []
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', slug: '' });
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.categoryId && newSubcategory.name && newSubcategory.slug) {
      const updatedCategories = categories.map(cat => {
        if (cat.id === newSubcategory.categoryId) {
          return {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              {
                id: Date.now(),
                name: newSubcategory.name,
                slug: newSubcategory.slug
              }
            ]
          };
        }
        return cat;
      });
      setCategories(updatedCategories);
      setNewSubcategory({ categoryId: null, name: '', slug: '' });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId)
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Category Management</h1>
      
      {/* Add New Category */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Category Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Category Slug"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={newCategory.slug}
            onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
          />
          <button
            onClick={handleAddCategory}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Add New Subcategory */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Subcategory</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={newSubcategory.categoryId || ''}
            onChange={(e) => setNewSubcategory({...newSubcategory, categoryId: parseInt(e.target.value)})}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Subcategory Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={newSubcategory.name}
            onChange={(e) => setNewSubcategory({...newSubcategory, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Subcategory Slug"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={newSubcategory.slug}
            onChange={(e) => setNewSubcategory({...newSubcategory, slug: e.target.value})}
          />
          <button
            onClick={handleAddSubcategory}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subcategory
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">/{category.slug}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Subcategories */}
            <div className="p-4">
              {category.subcategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.subcategories.map(subcategory => (
                    <div key={subcategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">{subcategory.name}</p>
                          <p className="text-xs text-gray-500">/{subcategory.slug}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                          <Edit className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No subcategories yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;