import img1 from "../assets/sauce/img1.avif";
import img2 from "../assets/sauce/img2.avif";
import img3 from "../assets/sauce/img3.avif";
import img4 from "../assets/sauce/img4.avif";
import img5 from "../assets/sauce/img5.avif";
import img6 from "../assets/sauce/img6.avif";
import img7 from "../assets/sauce/img7.avif";
import img8 from "../assets/sauce/img8.avif";
import img9 from "../assets/sauce/img9.avif";
import img10 from "../assets/sauce/img10.avif";
import img11 from "../assets/sauce/img11.avif";
import img12 from "../assets/sauce/img12.avif";
import { useNavigate } from "react-router-dom";

const sauceProducts = [
  {
    id: 1,
    name: "Maggi Rich Tomato Ketchup",
    weight: "190 g",
    price: 70,
    time: "10 MINS",
    image: img1
  },
  {
    id: 2,
    name: "Del Monte Tomato Ketchup",
    weight: "900 g",
    price: 85,
    mrp: 120,
    discount: "29% OFF",
    time: "10 MINS",
    image: img2
  },
  {
    id: 3,
    name: "Veeba Chef's Special Tomato Ketchup",
    weight: "900 g",
    price: 79,
    mrp: 113,
    discount: "30% OFF",
    time: "10 MINS",
    image: img3
  },
  {
    id: 4,
    name: "Chokhi Dhani Tomato Ketchup",
    weight: "950 g",
    price: 99,
    mrp: 150,
    discount: "34% OFF",
    time: "21 MINS",
    image: img4
  },
  {
    id: 5,
    name: "Kissan Fresh Tomato Ketchup",
    weight: "1.1 kg",
    price: 117,
    mrp: 140,
    discount: "16% OFF",
    time: "10 MINS",
    image: img5
  },
  {
    id: 6,
    name: "Kissan Tomato Ketchup",
    weight: "850 g",
    price: 93,
    time: "10 MINS",
    image: img6
  },
  {
    id: 7,
    name: "Kissan Tomato Ketchup (No Onion & Garlic)",
    weight: "850 g",
    price: 110,
    mrp: 120,
    discount: "8% OFF",
    time: "10 MINS",
    image: img7
  },
  {
    id: 8,
    name: "Little Joys Tomato Sauce - No Added Sugar",
    weight: "320 g",
    price: 349,
    time: "10 MINS",
    image: img8
  },
  {
    id: 9,
    name: "Maggi Rich Tomato Ketchup",
    weight: "960 g",
    price: 144,
    mrp: 159,
    discount: "9% OFF",
    time: "10 MINS",
    image: img9
  },
  {
    id: 10,
    name: "The True Tomato Ketchup (Classic)",
    weight: "220 g",
    price: 229,
    mrp: 249,
    discount: "8% OFF",
    time: "21 MINS",
    image: img10
  },
  {
    id: 11,
    name: "Troovy Healthy Tomato Ketchup",
    weight: "340 g",
    price: 165,
    time: "10 MINS",
    image: img11
  },
  {
    id: 12,
    name: "Heinz Tomato Ketchup",
    weight: "435 g",
    price: 146,
    mrp: 155,
    time: "10 MINS",
    outOfStock: true,
    image: img12
  }
];

export default function SauceProducts() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Sauces & Ketchup</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sauceProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border p-3 hover:shadow-md transition relative"
          >
            {/* Image */}
            <div className="relative bg-gray-50 rounded-lg p-2">
              {item.discount && (
                <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  {item.discount}
                </span>
              )}

              {item.outOfStock && (
                <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
                  Out of Stock
                </span>
              )}

              <img
                src={item.image}
                alt={item.name}
                className="h-36 w-full object-contain"
              />
            </div>

            {/* Delivery */}
            <p className="text-xs text-gray-600 mt-2">⏱ {item.time}</p>

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
              onClick={() => !item.outOfStock && handleAddClick(item)}
              disabled={item.outOfStock}
              className={`mt-3 w-full rounded-lg py-1.5 text-sm font-semibold
                ${
                  item.outOfStock
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "border border-green-600 text-green-600 hover:bg-green-50"
                }`}
            >
              ADD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}