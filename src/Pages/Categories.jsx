import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import BannerImg from "../assets/new/banner.jpg";
import BannerImg2 from "../assets/new/ban1.jpg";
import BannerImg3 from "../assets/new/ban2.jpg";

const bannerImages = [
  
  { id: 1, src: BannerImg2, alt: "Banner 2" },
  { id: 2, src: BannerImg3, alt: "Banner 3" },
];

// Export categories for use in other components
export const categoryData = []; // Will be populated from API

const Categories = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://iamashop-production.up.railway.app/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(Array.isArray(data) ? data : []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Auto-rotate banner images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      {/* Banner Carousel Section */}
      <div className="relative w-full max-w-6xl mx-auto mb-8 m-2">
        <div className="overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {bannerImages.map((image, index) => (
              <div key={image.id} className="min-w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity duration-300"
          aria-label="Previous image"
        >
          &#8249;
        </button>
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity duration-300"
          aria-label="Next image"
        >
          &#8250;
        </button>
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-xl font-semibold">Shop by Category</h2>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="mx-auto h-44 w-44 bg-gray-200 rounded-3xl"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="cursor-pointer text-center"
              >
                <div className="mx-auto h-44 w-44 overflow-hidden rounded-3xl transition-transform hover:scale-105">
                  <img
                    src={cat.image || cat.img}
                    alt={cat.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/200x200?text=No+Image';
                    }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>

  );
};

export default Categories;
