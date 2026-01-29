import img1 from "../assets/cleaning/img1.avif";
import img2 from "../assets/cleaning/img2.avif";
import img3 from "../assets/cleaning/img3.jpg";
import img4 from "../assets/cleaning/img4.jpg";
import img5 from "../assets/cleaning/img5.jpg";
import img6 from "../assets/cleaning/img6.jpg";
import img7 from "../assets/cleaning/img7.jpg";
import img8 from "../assets/cleaning/img8.jpg";
import img9 from "../assets/cleaning/img9.jpg";
import img10 from "../assets/cleaning/img10.jpg";
import img11 from "../assets/cleaning/img11.jpg";
import img12 from "../assets/cleaning/img12.jpg";
import { useNavigate } from "react-router-dom";

const cleaningProducts = [
  {
    id: 1,
    name: "Softspun Microfiber Mesh Wire Steel",
    qty: "5 pcs",
    price: 112,
    oldPrice: 312,
    discount: "64% OFF",
    time: "10 MINS",
    image: img1
  },
  {
    id: 2,
    name: "Scotch Brite Sponge Scrub",
    qty: "3 pcs",
    price: 74,
    oldPrice: 75,
    discount: "1% OFF",
    time: "10 MINS",
    image: img2
  },
  {
    id: 3,
    name: "Scotch Brite Stainless Steel Scrubber",
    qty: "1 pc",
    price: 30,
    time: "10 MINS",
    image: img3
  },
  {
    id: 4,
    name: "Scotch Brite Stainless Steel Scrubber Ball",
    qty: "1 pc",
    price: 20,
    time: "10 MINS",
    image: img4
  },
  {
    id: 5,
    name: "Exo Steel Scrubber",
    qty: "1 pc",
    price: 14,
    oldPrice: 15,
    discount: "6% OFF",
    time: "10 MINS",
    image: img5
  },
  {
    id: 6,
    name: "Scotch Brite Silver Sparks Scrub Pad",
    qty: "3 pcs",
    price: 55,
    time: "10 MINS",
    image: img6
  },
  {
    id: 7,
    name: "Harpic Toilet Cleaner",
    qty: "1 Ltr",
    price: 85,
    oldPrice: 95,
    discount: "11% OFF",
    time: "15 MINS",
    image: img7
  },
  {
    id: 8,
    name: "Domex Disinfectant Toilet Cleaner",
    qty: "500 ml",
    price: 65,
    time: "10 MINS",
    image: img8
  },
  {
    id: 9,
    name: "Vim Dishwash Gel",
    qty: "750 ml",
    price: 72,
    oldPrice: 80,
    discount: "10% OFF",
    time: "10 MINS",
    image: img9
  },
  {
    id: 10,
    name: "Surf Excel Easy Wash",
    qty: "1 kg",
    price: 125,
    oldPrice: 140,
    discount: "11% OFF",
    time: "12 MINS",
    image: img10
  },
  {
    id: 11,
    name: "Ariel Matic Washing Powder",
    qty: "2 kg",
    price: 280,
    oldPrice: 320,
    discount: "13% OFF",
    time: "15 MINS",
    image: img11
  },
  {
    id: 12,
    name: "Lizol Floor Cleaner",
    qty: "1 Ltr",
    price: 95,
    oldPrice: 110,
    discount: "14% OFF",
    time: "10 MINS",
    image: img12
  }
];

export default function Cleaning() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Cleaning Essentials</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cleaningProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border p-3 hover:shadow-md transition"
          >
            {/* Image & Discount */}
            <div className="relative">
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
            <p className="text-xs text-gray-600 mt-2">⏱ {item.time}</p>

            {/* Title */}
            <h3 className="text-sm font-medium mt-1 line-clamp-2">
              {item.name}
            </h3>

            {/* Quantity */}
            <p className="text-xs text-gray-500 mt-1">{item.qty}</p>

            {/* Price */}
            <div className="mt-2">
              <span className="font-semibold text-sm">₹{item.price}</span>
              {item.oldPrice && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  ₹{item.oldPrice}
                </span>
              )}
            </div>

            {/* ADD Button */}
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