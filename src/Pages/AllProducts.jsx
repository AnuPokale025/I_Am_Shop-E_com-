import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSearch } from "../context/SearchContext.jsx";
import amulTaja from "../assets/ProductImages/amul_taja.jpg";
import amulMasti from "../assets/ProductImages/amul_masti.jpg";
import amulGold from "../assets/ProductImages/amul_gold.jpg";
import amulCow from "../assets/ProductImages/amul_cow.jpg";
import amulButter from "../assets/ProductImages/amul_butter.jpg";
import egg from "../assets/ProductImages/egg.jpg";

const products = [
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

const AllProducts = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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

        <h2 className="text-2xl font-bold">Dairy, Bread & Eggs</h2>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No products found for "{searchQuery}"
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border p-3 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
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

export default AllProducts;
