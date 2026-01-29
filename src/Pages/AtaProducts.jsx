import img1 from "../assets/ata/img1.avif";
import img2 from "../assets/ata/img2.avif";
import img3 from "../assets/ata/img3.avif";
import img4 from "../assets/ata/img4.avif";
import img5 from "../assets/ata/img5.avif";
import img6 from "../assets/ata/img6.avif";
import img7 from "../assets/ata/img7.avif";
import img8 from "../assets/ata/img8.avif";
import img9 from "../assets/ata/img9.avif";
import img10 from "../assets/ata/img10.avif";
import img11 from "../assets/ata/img11.avif";
import img12 from "../assets/ata/img12.avif";
import { useNavigate } from "react-router-dom";

const attaProducts = [
  {
    id: 1,
    name: "Aashirvaad Shudh Chakki Atta (100%)",
    weight: "5 kg",
    price: 252,
    mrp: 263,
    discount: "20% OFF",
    image: img1
  },
  {
    id: 2,
    name: "Fortune Chakki Fresh Atta",
    weight: "5 kg",
    price: 220,
    mrp: 277,
    discount: "8% OFF",
    image: img2
  },
  {
    id: 3,
    name: "Aashirvaad Shudh Chakki Atta",
    weight: "10 kg",
    price: 471,
    mrp: 516,
    discount: "8% OFF",
    image: img3
  },
  {
    id: 4,
    name: "Aashirvaad Select MP Sharbati Atta",
    weight: "5 kg",
    price: 339,
    mrp: 378,
    discount: "10% OFF",
    image: img4
  },
  {
    id: 5,
    name: "Aashirvaad High Fibre Multigrain Atta",
    weight: "5 kg",
    price: 330,
    mrp: 394,
    discount: "15% OFF",
    image: img5
  },
  {
    id: 6,
    name: "Pillsbury Chakki Fresh Atta",
    weight: "5 kg",
    price: 236,
    mrp: 283,
    discount: "16% OFF",
    image: img6
  },
  {
    id: 7,
    name: "Organic Tattva Organic Ragi Flour",
    weight: "500 g",
    price: 80,
    mrp: 95,
    discount: "15% OFF",
    image: img7
  },
  {
    id: 8,
    name: "Fortune Premium MP Sharbati Atta",
    weight: "5 kg",
    price: 319,
    mrp: 385,
    discount: "17% OFF",
    image: img8
  },
  {
    id: 9,
    name: "Whole Farm Chakki Atta",
    weight: "5 kg",
    price: 200,
    mrp: 290,
    discount: "31% OFF",
    image: img9
  },
  {
    id: 10,
    name: "True Story Organic Jowar Flour",
    weight: "500 g",
    price: 57,
    mrp: 75,
    discount: "24% OFF",
    image: img10
  },
  {
    id: 11,
    name: "True Story Organic Ragi Flour",
    weight: "500 g",
    price: 67,
    mrp: 80,
    discount: "16% OFF",
    image: img11
  },
  {
    id: 12,
    name: "True Story Organic Bajra Flour",
    weight: "500 g",
    price: 48,
    mrp: 75,
    discount: "36% OFF",
    options: "2 options",
    image: img12
  }
];

export default function AttaProducts() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Atta, Flours & Sooji</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {attaProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border p-3 hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative bg-orange-50 rounded-lg p-2">
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

            {/* ADD */}
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