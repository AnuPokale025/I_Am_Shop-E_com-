import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CategorySelector = ({ 
  selectedCategory, 
  selectedSubcategory, 
  onCategoryChange, 
  onSubcategoryChange,
  categories 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Find selected category and subcategory
  const selectedCat = categories.find(cat => cat.id === selectedCategory);
  const selectedSub = selectedCat?.subcategories.find(sub => sub.id === selectedSubcategory);

  const handleCategorySelect = (categoryId) => {
    onCategoryChange(categoryId);
    // Reset subcategory when category changes
    onSubcategoryChange(null);
  };

  return (
    <div className="relative">
      <div 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            {selectedCat ? (
              <div>
                <span className="font-medium text-gray-900">{selectedCat.name}</span>
                {selectedSub && (
                  <span className="text-gray-500 ml-2">→ {selectedSub.name}</span>
                )}
              </div>
            ) : (
              <span className="text-gray-500">Select Category</span>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {categories.map(category => (
            <div key={category.id} className="border-b border-gray-100 last:border-b-0">
              <div 
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                  selectedCategory === category.id ? 'bg-green-50' : ''
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {selectedCategory === category.id && category.subcategories.length > 0 && (
                <div className="bg-gray-50">
                  {category.subcategories.map(subcategory => (
                    <div
                      key={subcategory.id}
                      className={`px-8 py-2 cursor-pointer hover:bg-green-100 ${
                        selectedSubcategory === subcategory.id ? 'bg-green-100' : ''
                      }`}
                      onClick={() => onSubcategoryChange(subcategory.id)}
                    >
                      <span className="text-gray-700">{subcategory.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;