import { useNavigate } from "react-router-dom";

import dairyImg from "../assets/categories/bakery.jpg";
import coldDrinkImg from "../assets/categories/cold drink.jpg";
import snacksImg from "../assets/categories/chips.jpg";
import babyCareImg from "../assets/categories/baby care.jpg";
import cleaningEssentialsImg from "../assets/categories/cleaning essentials.jpg";
import homeOfficeImg from "../assets/categories/home and office.jpg";
import organicImg from "../assets/categories/organic.jpg";
import breakfastFoodImg from "../assets/categories/breakfast instant food.jpg";
import masalaImg from "../assets/categories/masala.jpg";
import ataImg from "../assets/categories/ata.jpg";
import saucesImg from "../assets/categories/sauces.jpg";
import petCareImg from "../assets/categories/pet.jpg";
import BannerImg from "../assets/new/banner.jpg";
import BannerImg2 from "../assets/new/ban1.jpg";
import BannerImg3 from "../assets/new/ban2.jpg";

import { useState, useEffect } from "react";

const bannerImages = [
  
  { id: 1, src: BannerImg2, alt: "Banner 2" },
  { id: 2, src: BannerImg3, alt: "Banner 3" },
];

const categories = [
  { id: 1, name: "Dairy, Bread & Eggs", img: dairyImg, slug: "dairy" },
  { id: 2, name: "Cold Drinks & Juices", img: coldDrinkImg, slug: "cold-drink" },
  { id: 3, name: "Snacks & Munchies", img: snacksImg, slug: "snack" },
  { id: 4, name: "Baby Care", img: babyCareImg, slug: "baby-care" },
  { id: 5, name: "Cleaning Essentials", img: cleaningEssentialsImg, slug: "cleaning-essentials" },
  { id: 6, name: "Home & Office", img: homeOfficeImg, slug: "home-office" },
  { id: 7, name: "Organic Products", img: organicImg, slug: "organic-products" },
  { id: 8, name: "Breakfast & Instant Food", img: breakfastFoodImg, slug: "breakfast-instant-food" },
  { id: 9, name: "Masala & Spices", img: masalaImg, slug: "masala-spices" },
  { id: 10, name: "Ata & Flours", img: ataImg, slug: "ata-flours" },
  { id: 11, name: "Sauces & Spreads", img: saucesImg, slug: "sauces-spreads" },
  { id: 12, name: "Pet Care", img: petCareImg, slug: "pet-care" },
];

const Categories = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/Categories/${cat.slug}`)}
              className="cursor-pointer text-center"
            >
              <div className="mx-auto h-44 w-44 overflow-hidden rounded-3xl transition-transform hover:scale-105">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>

  );
};

export default Categories;
