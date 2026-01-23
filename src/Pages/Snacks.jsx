import React from "react";
import Img1 from "../assets/Snacks/s1.jpg";
import Img2 from "../assets/Snacks/s2.jpg";
import Img3 from "../assets/Snacks/s3.jpg";
import Img4 from "../assets/Snacks/s4.jpg";
import Img5 from "../assets/Snacks/s5.jpg";
import Img6 from "../assets/Snacks/s6.jpg";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSearch } from "../context/SearchContext.jsx";

const snacks = [
  {
    id: "snack-1",
    name: "Beanly Choco Hazelnut Spread with Breadsticks",
    qty: "52 g",
    price: 99,
    oldPrice: 133,
    discount: "25% OFF",
    img: Img1,
    category: "Snacks & Munchies"
  },
  {
    id: "snack-2",
    name: "Kettle Studio Air Fried Lime & Chilli Potato Chips",
    qty: "80 g",
    price: 99,
    img: Img2,
    category: "Snacks & Munchies"
  },
  {
    id: "snack-3",
    name: "Red Rock Deli Kettle Chips Basil Thai Sweet Chilli",
    qty: "58 g",
    price: 51,
    oldPrice: 60,
    discount: "15% OFF",
    img: Img3,
    category: "Snacks & Munchies"
  },
  {
    id: "snack-4",
    name: "Kettle Studio Rock Sea Salt & English Vinegar",
    qty: "113 g",
    price: 99,
    img: Img4,
    category: "Snacks & Munchies"
  },
  {
    id: "snack-5",
    name: "Red Rock Deli Cheddar & Parmesan Risotto",
    qty: "53 g",
    price: 51,
    oldPrice: 60,
    discount: "15% OFF",
    img: Img5,
    category: "Snacks & Munchies"
  },
  {
    id: "snack-6",
    name: "Kettle Studio Sharp Jalapenos & Cream",
    qty: "113 g",
    price: 99,
    img: Img6,
    category: "Snacks & Munchies"
  },
];

const Snacks = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  const filteredSnacks = snacks.filter(snack => 
    snack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goBack = () => {
    navigate(-1);
  };

  const handleAdd = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  return (
    <div className="px-6 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={goBack}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-xl font-bold">Snacks & Munchies</h2>
      </div>

      {/* Cards */}
      {filteredSnacks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No snacks found for "{searchQuery}"
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {filteredSnacks.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-xl border p-3 flex flex-col justify-between min-w-45"
          >
            {item.discount && (
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-md font-semibold">
                {item.discount}
              </span>
            )}

            <img
              src={item.img}
              alt={item.name}
              className="h-32 mx-auto object-contain"
            />

            <div className="text-xs text-gray-600 mt-2">⏱ 8 MINS</div>

            <h3 className="text-sm font-medium mt-1 line-clamp-2">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500">{item.qty}</p>

            <div className="flex justify-between items-center mt-2">
              <div>
                <span className="font-semibold">₹{item.price}</span>
                {item.oldPrice && (
                  <span className="text-xs text-gray-400 line-through ml-1">
                    ₹{item.oldPrice}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleAdd(item)}
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

export default Snacks;
