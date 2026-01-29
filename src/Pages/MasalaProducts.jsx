import img1 from "../assets/masala/img1.avif";
import img2 from "../assets/masala/img2.avif";
import img3 from "../assets/masala/img3.avif";
import img4 from "../assets/masala/img4.avif";
import img5 from "../assets/masala/img5.avif";
import img6 from "../assets/masala/img6.avif";
import img7 from "../assets/masala/img7.avif";
import img8 from "../assets/masala/img8.avif";
import img9 from "../assets/masala/img9.avif";
import img10 from "../assets/masala/img10.avif";
import img11 from "../assets/masala/img11.avif";
import img12 from "../assets/masala/img12.avif";
import { useNavigate } from "react-router-dom";

const masalaProducts = [
  {
    id: 1,
    name: "Pushp Pickle Masala",
    weight: "200 g",
    price: 68,
    mrp: 85,
    discount: "20% OFF",
    options: "2 options",
    image: img1
  },
  {
    id: 2,
    name: "Maggi Masala-ae-Magic Sabzi Masala",
    weight: "72 g",
    price: 55,
    mrp: 60,
    discount: "8% OFF",
    image: img2
  },
  {
    id: 3,
    name: "Everest Coriander Powder / Dhania",
    weight: "100 g",
    price: 36,
    mrp: 40,
    discount: "10% OFF",
    image: img3
  },
  {
    id: 4,
    name: "Suruchi Classic Chilli Powder",
    weight: "100 g",
    price: 38,
    image: img4
  },
  {
    id: 5,
    name: "Pushp Shahi Compounded Hing",
    weight: "50 g",
    price: 341,
    mrp: 395,
    discount: "13% OFF",
    image: img5
  },
  {
    id: 6,
    name: "Whole Farm Premium Desiccated Coconut",
    weight: "100 g",
    price: 48,
    mrp: 80,
    discount: "40% OFF",
    image: img6
  },
  {
    id: 7,
    name: "Everest Kashmiri Red Chilli Powder",
    weight: "100 g",
    price: 93,
    mrp: 106,
    discount: "12% OFF",
    image: img7
  },
  {
    id: 8,
    name: "Everest Tikhalal Red Chilli Powder",
    weight: "100 g",
    price: 50,
    mrp: 58,
    discount: "13% OFF",
    options: "2 options",
    image: img8
  },
  {
    id: 9,
    name: "Suruchi Classic Coriander Powder",
    weight: "500 g",
    price: 141,
    mrp: 143,
    image: img9
  },
  {
    id: 10,
    name: "Everest Sambhar Masala",
    weight: "100 g",
    price: 86,
    image: img10
  },
  {
    id: 11,
    name: "Catch Sprinklers - Chat Masala",
    weight: "100 g",
    price: 90,
    image: img11
  },
  {
    id: 12,
    name: "Suruchi Classic Amchur Powder",
    weight: "50 g",
    price: 26,
    image: img12
  }
];

export default function MasalaProducts() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Masala & Spices</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {masalaProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-3 hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative rounded-lg p-2">
              {item.discount && (
                <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  {item.discount}
                </span>
              )}

              <img
                src={item.image}
                alt={item.name}
                className="h-36 w-full object-contain"
              />
            </div>

            {/* Delivery */}
            <p className="text-xs text-gray-600 mt-2">⏱ 10 MINS</p>

            {/* Name */}
            <h3 className="text-sm font-medium mt-1 line-clamp-2">
              {item.name}
            </h3>

            {/* Weight */}
            <p className="text-xs text-gray-500 mt-1">{item.weight}</p>

            {/* Price */}
            <div className="mt-2">
              <span className="font-semibold text-sm">₹{item.price}</span>
              {item.mrp && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  ₹{item.mrp}
                </span>
              )}
            </div>

            {/* ADD Button */}
            <button 
              onClick={() => handleAddClick(item)}
              className="mt-3 w-full border border-green-600 text-green-600 rounded-lg py-1.5 text-sm font-semibold hover:bg-green-50"
            >
              ADD
              {item.options && (
                <div className="text-[10px] text-gray-500">
                  {item.options}
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}