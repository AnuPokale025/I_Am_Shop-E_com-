import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext.jsx";

// Cold Drink Images
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
    name: "Hell ",
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

const ColdDrinks = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  
  const filteredDrinks = coldDrinks.filter(drink => 
    drink.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const handleSeeAll = () => {
    navigate("/allcolddrinks");
  };

  return (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Cold Drinks & Juices</h2>
        <button 
          onClick={handleSeeAll}
          className="text-green-600 font-medium hover:underline"
        >
          see all
        </button>
      </div>

      {/* Product List */}
      {filteredDrinks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No cold drinks found for "{searchQuery}"
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {filteredDrinks.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-xl border p-3 flex flex-col justify-between min-w-45"
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

            {/* Delivery Time */}
            <div className="text-xs text-gray-600 mt-2 flex items-center gap-1">
              ⏱ <span>8 MINS</span>
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

export default ColdDrinks;
