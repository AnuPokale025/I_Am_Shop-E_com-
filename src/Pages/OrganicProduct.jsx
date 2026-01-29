import img1 from "../assets/organic/img1.avif";
import img2 from "../assets/organic/img2.avif";
import img3 from "../assets/organic/img3.avif";
import img4 from "../assets/organic/img4.avif";
import img5 from "../assets/organic/img5.avif";
import img6 from "../assets/organic/img6.avif";
import img7 from "../assets/organic/img7.avif";
import img8 from "../assets/organic/img8.avif";
import img9 from "../assets/organic/img9.avif";
import img10 from "../assets/organic/img10.avif";
import img11 from "../assets/organic/img11.avif";
import img12 from "../assets/organic/img12.avif";
import { useNavigate } from "react-router-dom";

const organicProducts = [
  {
    id: 1,
    name: "Organic Tattva Organic Ragi Flour",
    weight: "500 g",
    price: 80,
    mrp: 95,
    discount: "15% OFF",
    image: img1
  },
  {
    id: 2,
    name: "True Story Organic Jowar Flour",
    weight: "500 g",
    price: 57,
    mrp: 75,
    discount: "24% OFF",
    image: img2
  },
  {
    id: 3,
    name: "True Story 100% Pure Organic Ragi Flour",
    weight: "500 g",
    price: 67,
    mrp: 80,
    discount: "16% OFF",
    image: img3
  },
  {
    id: 4,
    name: "True Story Organic Bajra Flour",
    weight: "500 g",
    price: 48,
    mrp: 75,
    discount: "36% OFF",
    image: img4
  },
  {
    id: 5,
    name: "Pro Nature Organic Red Poha",
    weight: "500 g",
    price: 91,
    mrp: 96,
    discount: "5% OFF",
    image: img5
  },
  {
    id: 6,
    name: "24 Mantra Organic Idly Rava / Sooji",
    weight: "500 g",
    price: 60,
    mrp: 65,
    discount: "7% OFF",
    image: img6
  },
  {
    id: 7,
    name: "Organic Tattva Organic Whole Wheat Flour",
    weight: "1 kg",
    price: 75,
    mrp: 85,
    discount: "12% OFF",
    image: img7
  },
  {
    id: 8,
    name: "True Story Organic Millet Mix",
    weight: "500 g",
    price: 120,
    mrp: 140,
    discount: "14% OFF",
    image: img8
  },
  {
    id: 9,
    name: "Pro Nature Organic Brown Rice",
    weight: "1 kg",
    price: 110,
    mrp: 130,
    discount: "15% OFF",
    image: img9
  },
  {
    id: 10,
    name: "24 Mantra Organic Quinoa",
    weight: "500 g",
    price: 180,
    mrp: 200,
    discount: "10% OFF",
    image: img10
  },
  {
    id: 11,
    name: "Organic Tattva Organic Besan",
    weight: "500 g",
    price: 65,
    mrp: 75,
    discount: "13% OFF",
    image: img11
  },
  {
    id: 12,
    name: "True Story Organic Moong Dal",
    weight: "500 g",
    price: 85,
    mrp: 95,
    discount: "11% OFF",
    image: img12
  }
];

export default function OrganicProducts() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">
        Organic Atta, Flour & Sooji
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {organicProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-3 hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative bg-pink-50 rounded-lg p-2">
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

            {/* Title */}
            <h3 className="text-sm font-medium mt-1 line-clamp-2">
              {item.name}
            </h3>

            {/* Weight */}
            <p className="text-xs text-gray-500 mt-1">{item.weight}</p>

            {/* Price */}
            <div className="mt-2">
              <span className="font-semibold text-sm">₹{item.price}</span>
              <span className="text-xs text-gray-400 line-through ml-2">
                ₹{item.mrp}
              </span>
            </div>

            {/* Add Button */}
            <button 
              onClick={() => handleAddClick(item)}
              className="mt-3 w-full border border-green-600 text-green-600 rounded-lg py-1.5 text-sm font-semibold hover:bg-green-50"
            >
              ADD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}