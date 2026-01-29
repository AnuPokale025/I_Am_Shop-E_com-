import img1 from "../assets/breakfast/img1.avif";
import img2 from "../assets/breakfast/img2.avif";
import img3 from "../assets/breakfast/img3.avif";
import img4 from "../assets/breakfast/img4.avif";
import img5 from "../assets/breakfast/img5.avif";
import img6 from "../assets/breakfast/img6.avif";
import img7 from "../assets/breakfast/img7.avif";
import img8 from "../assets/breakfast/img8.avif";
import img9 from "../assets/breakfast/img9.avif";
import img10 from "../assets/breakfast/img10.avif";
import img11 from "../assets/breakfast/img11.avif";
import img12 from "../assets/breakfast/img12.avif";
import { useNavigate } from "react-router-dom";

const breakfastProducts = [
  {
    id: 1,
    name: "Kellogg's Double Chocolaty Fills Chocos",
    weight: "250 g",
    price: 165,
    mrp: 182,
    discount: "9% OFF",
    options: "2 options",
    image: img1
  },
  {
    id: 2,
    name: "Kellogg's Corn Flakes with Immuno Nutrients",
    weight: "250 g",
    price: 111,
    image: img2
  },
  {
    id: 3,
    name: "Kellogg's Multigrain Chocos More",
    weight: "385 g",
    price: 199,
    options: "2 options",
    image: img3
  },
  {
    id: 4,
    name: "Kellogg's Chocos Crunchy Bites Kids",
    weight: "375 g",
    price: 179,
    mrp: 199,
    discount: "10% OFF",
    options: "2 options",
    image: img4
  },
  {
    id: 5,
    name: "Kellogg's Froot Loops Crunchy Multigrain",
    weight: "2 x 285 g",
    price: 348,
    mrp: 382,
    discount: "8% OFF",
    options: "2 options",
    image: img5
  },
  {
    id: 6,
    name: "Kellogg's Real Almond Honey Corn Flakes",
    weight: "1 kg",
    price: 366,
    mrp: 516,
    discount: "29% OFF",
    image: img6
  },
  {
    id: 7,
    name: "Kellogg's Corn Flakes Original",
    weight: "1.15 kg",
    price: 336,
    mrp: 471,
    discount: "28% OFF",
    image: img7
  },
  {
    id: 8,
    name: "Kellogg's Multigrain Chocos Variety Pack",
    weight: "7 pcs",
    price: 64,
    mrp: 70,
    discount: "8% OFF",
    options: "3 options",
    image: img8
  },
  {
    id: 9,
    name: "Kellogg's Corn Flakes With Real Honey",
    weight: "300 g",
    price: 167,
    mrp: 177,
    discount: "5% OFF",
    options: "2 options",
    image: img9
  },
  {
    id: 10,
    name: "Kwality Multigrain Chocos & Cereal Combo",
    weight: "102 g",
    price: 48,
    mrp: 60,
    discount: "20% OFF",
    image: img10
  },
  {
    id: 11,
    name: "Kellogg's Multigrain Chocos More",
    weight: "1.1 kg",
    price: 454,
    mrp: 489,
    discount: "7% OFF",
    image: img11
  },
  {
    id: 12,
    name: "Kellogg's Multigrain Chocos Moons & Stars",
    weight: "1.2 kg",
    price: 349,
    mrp: 666,
    discount: "47% OFF",
    image: img12
  }
];

export default function BreakfastProducts() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Breakfast Cereals</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {breakfastProducts.map((item) => (
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