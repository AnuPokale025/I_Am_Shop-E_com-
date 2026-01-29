import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Img1 from "../assets/Product_Details/images.jpg";
import Img2 from "../assets/Product_Details/img1.jpg";

export default function ProductDetail({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state?.product;

  // Use product data if available, otherwise use default data
  const [product, setProduct] = useState(productData || {
    id: "chips-jalapeno",
    name: "Kettle Studio Sharp Jalapenos & Cream Cheese Potato Chips",
    qty: "113g",
    price: 99,
    img: Img2,
    category: "Snacks & Munchies / Potato Chips"
  });
  
const features = [
  {
    title: "Round The Clock Delivery",
    desc: "Get items delivered to your doorstep from dark stores near you, whenever you need them.",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  },
  {
    title: "Best Prices & Offers",
    desc: "Best price destination with offers directly from the manufacturers.",
    img: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
  },
  {
    title: "Wide Assortment",
    desc: "Choose from 30,000+ products across food, personal care, household & other categories.",
    img: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  },
];

  const [selectedImg, setSelectedImg] = useState(product.img || product.image || Img2);
  const [selectedUnit, setSelectedUnit] = useState(product.qty || product.weight);
  const thumbnails = [product.img || product.image || Img2, Img1];

  useEffect(() => {
    if (productData) {
      setProduct(productData);
      setSelectedImg(productData.img || productData.image || Img2);
      setSelectedUnit(productData.qty || productData.weight);
    }
  }, [productData]);

  const handleAddToCart = () => {
    const newItem = {
      id: product.id,
      name: product.name,
      qty: 1,
      price: product.price,
      img: selectedImg,
      unit: selectedUnit
    };

    setCartItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item => item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, newItem];
    });

    // Show feedback and navigate back
    // alert("Added to cart!");
    navigate(-1);
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">


      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT – PRODUCT IMAGES */}
        <div>
          <div className="border rounded-lg p-6 flex justify-center">
            <img
              src={selectedImg}
              alt={product.name}
              className="h-80 object-contain"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {thumbnails.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImg(img)}
                className={`border rounded-lg p-2 ${selectedImg === img ? "border-green-600" : ""
                  }`}
              >
                <img src={img} alt="thumb" className="h-14" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT – PRODUCT DETAILS */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Home / {product.category || "Dairy, Bread & Eggs"}
          </p>

          <h1 className="text-2xl font-semibold mb-4">
            {product.name}
          </h1>

          {/* UNIT SELECTION */}
          <p className="font-medium mb-2">Select Unit</p>
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setSelectedUnit(product.qty || product.weight)}
              className={`px-4 py-2 rounded-lg border ${selectedUnit === (product.qty || product.weight)
                ? "border-green-600 bg-green-50 text-green-700"
                : ""
                }`}
            >
              <p className="text-sm">{product.qty || product.weight}</p>
              <p className="font-semibold">₹{product.price}</p>
            </button>
          </div>
          

          {/* PRICE + ADD TO CART */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xl font-semibold">₹{product.price}</p>
              <p className="text-sm text-gray-500">
                (Inclusive of all taxes)
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Add to cart
            </button>
          </div>
          <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-6">
              Why shop from I am Shop?
            </h2>

            <div className="space-y-6">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-14 h-14 object-contain"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}