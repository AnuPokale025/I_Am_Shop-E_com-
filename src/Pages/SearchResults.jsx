import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSearch } from "../context/SearchContext.jsx";

// Import all product data
import amulTaja from "../assets/ProductImages/amul_taja.jpg";
import amulMasti from "../assets/ProductImages/amul_masti.jpg";
import amulGold from "../assets/ProductImages/amul_gold.jpg";
import amulCow from "../assets/ProductImages/amul_cow.jpg";
import amulButter from "../assets/ProductImages/amul_butter.jpg";
import egg from "../assets/ProductImages/egg.jpg";

// Dairy Products
const dairyProducts = [
  {
    id: 1,
    name: "Amul Taaza Toned Milk",
    qty: "500 ml",
    price: 28,
    img: amulTaja,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 2,
    name: "Amul Masti Pouch Curd",
    qty: "390 g",
    price: 35,
    img: amulMasti,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 3,
    name: "Amul Gold Full Cream Milk",
    qty: "500 ml",
    price: 35,
    img: amulGold,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 4,
    name: "Amul Cow Milk",
    qty: "500 ml",
    price: 28,
    img: amulCow,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 5,
    name: "Amul Salted Butter",
    qty: "100 g",
    price: 58,
    img: amulButter,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 6,
    name: "Yolkers Classic White Eggs",
    qty: "6 pcs",
    price: 57,
    oldPrice: 66,
    img: egg,
    category: "Dairy, Bread & Eggs"
  }
];

// Snack Products
const snackProducts = [
  {
    id: "snack-1",
    name: "Bingo Mad Angles",
    qty: "104 g",
    price: 10,
    img: "https://via.placeholder.com/150?text=Bingo+Mad+Angles",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-2",
    name: "Lays Classic Chips",
    qty: "52 g",
    price: 10,
    img: "https://via.placeholder.com/150?text=Lays+Chips",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-3",
    name: "Kurkure Spicy Twist",
    qty: "52 g",
    price: 10,
    img: "https://via.placeholder.com/150?text=Kurkure",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-4",
    name: "Parle-G Biscuits",
    qty: "800 g",
    price: 40,
    oldPrice: 50,
    discount: "20% OFF",
    img: "https://via.placeholder.com/150?text=Parle+G",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-5",
    name: "Britannia Marie Gold",
    qty: "150 g",
    price: 12,
    img: "https://via.placeholder.com/150?text=Marie+Gold",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-6",
    name: "Oreo Chocolate Cookies",
    qty: "100 g",
    price: 12,
    img: "https://via.placeholder.com/150?text=Oreo",
    category: "Snacks & Branded Foods"
  }
];

// Cold Drink Products
import cocaColaImage from "../assets/coldDrink/hell.jpg";
import pepsiImage from "../assets/coldDrink/pepsi_b.jpg";
import spriteImage from "../assets/coldDrink/sprite_l.jpg";
import thumbsUpImage from "../assets/coldDrink/thmubs_u.jpg";
import fantaImage from "../assets/coldDrink/Fanta.jpg";
import mountainDewImage from "../assets/coldDrink/mountain_dew.jpg";
import sevenUpImage from "../assets/coldDrink/7_up.jpg";
import redBullImage from "../assets/coldDrink/red_bull.jpg";

const coldDrinks = [
  {
    id: "cold-1",
    name: "Coca-Cola Original",
    qty: "750 ml",
    price: 40,
    oldPrice: 45,
    discount: "11% OFF",
    img: cocaColaImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-2",
    name: "Pepsi Black",
    qty: "750 ml",
    price: 40,
    img: pepsiImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-3",
    name: "Sprite Lemon Lime",
    qty: "750 ml",
    price: 40,
    img: spriteImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-4",
    name: "Thumbs Up",
    qty: "750 ml",
    price: 40,
    img: thumbsUpImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-5",
    name: "Fanta Orange",
    qty: "750 ml",
    price: 40,
    img: fantaImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-6",
    name: "Mountain Dew",
    qty: "750 ml",
    price: 40,
    oldPrice: 45,
    discount: "11% OFF",
    img: mountainDewImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-7",
    name: "7UP Lemon Lime",
    qty: "750 ml",
    price: 40,
    img: sevenUpImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-8",
    name: "Red Bull Energy Drink",
    qty: "250 ml",
    price: 125,
    img: redBullImage,
    category: "Cold Drinks & Juices"
  }
];

// Combine all products
const allProducts = [
  ...dairyProducts,
  ...snackProducts,
  ...coldDrinks
];

const SearchResults = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const [searchParams] = useSearchParams();

  // Get search term from either context or URL params
  const searchTerm = searchQuery || searchParams.get('q') || '';

  // Filter all products based on search term
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-6 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={goBack}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <p className="text-gray-600 text-sm mt-1">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        </div>
      </div>

      {/* Search Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try searching for something else</p>
          <button
            onClick={goBack}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border p-3 flex flex-col justify-between hover:shadow-lg transition-shadow relative"
            >
              {item.discount && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-md font-semibold">
                  {item.discount}
                </span>
              )}

              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="h-32 object-contain mx-auto"
              />

              {/* Category */}
              <div className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                <span>{item.category}</span>
              </div>

              {/* Name */}
              <h3 className="text-sm font-medium mt-1 line-clamp-2">
                {item.name}
              </h3>

              {/* Quantity */}
              <p className="text-xs text-gray-500">{item.qty}</p>

              {/* Price + Button */}
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="font-semibold">₹{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-xs line-through text-gray-400 ml-1">
                      ₹{item.oldPrice}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleAddClick(item)}
                  className="border border-green-600 text-green-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-green-50"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;