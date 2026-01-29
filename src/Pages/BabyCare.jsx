import img1 from "../assets/Babycare/img1.jpg";
import img2 from "../assets/Babycare/img2.jpg";
import img3 from "../assets/Babycare/img3.jpg";
import img4 from "../assets/Babycare/img4.jpg";
import img5 from "../assets/Babycare/img5.jpg";
import img6 from "../assets/Babycare/img6.jpg";
import img7 from "../assets/Babycare/img7.jpg";
import img8 from "../assets/Babycare/img8.jpg";
import img9 from "../assets/Babycare/img9.jpg";
import img10 from "../assets/Babycare/img10.jpg";
import img11 from "../assets/Babycare/img11.jpg";
import img12 from "../assets/Babycare/img12.jpg";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Little's Fluffy Soft Pant Style Baby Diaper (XL)",
    qty: "24 pcs",
    price: 275,
    oldPrice: 420,
    discount: "34% OFF",
    time: "10 MINS",
    image: img1
  },
  {
    id: 2,
    name: "Pampers Premium Care Pant Style Baby Diaper",
    qty: "26 pcs",
    price: 753,
    oldPrice: 840,
    discount: "10% OFF",
    time: "10 MINS",
    image: img2
  },
  {
    id: 3,
    name: "Huggies Wonder Pant Style Baby Diaper",
    qty: "86 pcs",
    price: 628,
    oldPrice: 1299,
    discount: "51% OFF",
    time: "21 MINS",
    image: img3
  },
  {
    id: 4,
    name: "Johnson's Baby Powder",
    qty: "150g",
    price: 180,
    oldPrice: 220,
    discount: "18% OFF",
    time: "15 MINS",
    image: img4
  },
  {
    id: 5,
    name: "Pampers Baby Wipes",
    qty: "80 pcs",
    price: 120,
    oldPrice: 150,
    discount: "20% OFF",
    time: "12 MINS",
    image: img5
  },
  {
    id: 6,
    name: "Chicco Baby Shampoo",
    qty: "200ml",
    price: 299,
    oldPrice: 350,
    discount: "15% OFF",
    time: "10 MINS",
    image: img6
  },
  {
    id: 7,
    name: "Pigeon Baby Soap",
    qty: "125g",
    price: 95,
    oldPrice: 120,
    discount: "21% OFF",
    time: "10 MINS",
    image: img7
  },
  {
    id: 8,
    name: "Mustela Baby Lotion",
    qty: "200ml",
    price: 450,
    oldPrice: 520,
    discount: "13% OFF",
    time: "18 MINS",
    image: img8
  },
  {
    id: 9,
    name: "Himalaya Baby Oil",
    qty: "150ml",
    price: 175,
    oldPrice: 200,
    discount: "13% OFF",
    time: "10 MINS",
    image: img9
  },
  {
    id: 10,
    name: "Sebamed Baby Wash",
    qty: "200ml",
    price: 320,
    oldPrice: 380,
    discount: "16% OFF",
    time: "15 MINS",
    image: img10
  },
  {
    id: 11,
    name: "Mamaearth Gentle Cleansing Lotion",
    qty: "100ml",
    price: 249,
    oldPrice: 299,
    discount: "17% OFF",
    time: "12 MINS",
    image: img11
  },
  {
    id: 12,
    name: "Aveeno Baby Daily Moisture Lotion",
    qty: "180ml",
    price: 520,
    oldPrice: 600,
    discount: "13% OFF",
    time: "20 MINS",
    image: img12
  }
];

export default function BabyCare() {
  const navigate = useNavigate();

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Baby Care</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-3 hover:shadow-md transition"
          >
            {/* Image + Discount */}
            <div className="relative">
              <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                {item.discount}
              </span>
              <img
                src={item.image}
                alt={item.name}
                className="h-36 w-full object-contain"
              />
            </div>

            {/* Delivery */}
            <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
              ⏱ {item.time}
            </p>

            {/* Name */}
            <h3 className="text-sm font-medium mt-1 line-clamp-2">
              {item.name}
            </h3>

            {/* Quantity */}
            <p className="text-xs text-gray-500 mt-1">{item.qty}</p>

            {/* Price */}
            <div className="mt-2">
              <span className="font-semibold text-sm">₹{item.price}</span>
              <span className="text-xs text-gray-400 line-through ml-2">
                ₹{item.oldPrice}
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