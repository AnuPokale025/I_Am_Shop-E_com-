import React from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import img1 from "../assets/homeOffice/img1.avif";
import img2 from "../assets/homeOffice/img2.avif";
import img3 from "../assets/homeOffice/img3.avif";
import img4 from "../assets/homeOffice/img4.avif";
import img5 from "../assets/homeOffice/img5.avif";
import img6 from "../assets/homeOffice/img6.avif";
import img7 from "../assets/homeOffice/img7.avif";
import img8 from "../assets/homeOffice/img8.avif";
import img9 from "../assets/homeOffice/img9.avif";
import img10 from "../assets/homeOffice/img10.avif";
import img11 from "../assets/homeOffice/img11.avif";
import img12 from "../assets/homeOffice/img12.avif";

const ProductCard = ({ 
  discount, 
  image, 
  deliveryTime, 
  title, 
  quantity, 
  price, 
  originalPrice, 
  hasOptions,
  onAddClick
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
      {/* Discount Badge */}
      {discount && (
        <div className="relative mb-2">
          <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
            {discount}
          </div>
        </div>
      )}
      
      {/* Product Image */}
      <div className="flex items-center justify-center h-32 mb-4">
        <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
      </div>
      
      {/* Delivery Time */}
      <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
        <Clock size={12} />
        <span>{deliveryTime}</span>
      </div>
      
      {/* Product Title */}
      <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2 flex-grow">
        {title}
      </h3>
      
      {/* Quantity */}
      <p className="text-gray-500 text-xs mb-3">{quantity}</p>
      
      {/* Price and Add Button */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-gray-900 font-bold text-lg">₹{price}</span>
          {originalPrice && (
            <span className="text-gray-400 text-xs line-through">₹{originalPrice}</span>
          )}
        </div>
        
        <button 
          onClick={onAddClick}
          className="bg-white text-green-700 border-2 border-green-700 rounded-lg px-6 py-2 font-semibold text-sm hover:bg-green-50 transition-colors"
        >
          ADD
          {hasOptions && (
            <div className="text-xs font-normal mt-0.5">{hasOptions}</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default function Home_Office() {
  const navigate = useNavigate();

  const products = [
    {
      discount: '33% OFF',
      image: img1,
      deliveryTime: '21 MINS',
      title: 'Kressa Savvy Toilet Roll (2 Ply)',
      quantity: '6 rolls',
      price: '149',
      originalPrice: '275',
      hasOptions: null
    },
    {
      discount: '8% OFF',
      image: img2,
      deliveryTime: '10 MINS',
      title: 'Ezee Premium Garbage Bag (Medium, 48 x 56 cm)',
      quantity: '30 pcs',
      price: '66',
      originalPrice: '72',
      hasOptions: '3 options'
    },
    {
      discount: '10% OFF',
      image: img3,
      deliveryTime: '10 MINS',
      title: 'Ezee Premium Garbage Bag (Large, 60 x 81 cm)',
      quantity: '15 pcs',
      price: '81',
      originalPrice: '90',
      hasOptions: '3 options'
    },
    {
      discount: '7% OFF',
      image: img4,
      deliveryTime: '10 MINS',
      title: 'Savlon Germ Protection Antiseptic Wipes',
      quantity: '72 pcs',
      price: '196',
      originalPrice: '210',
      hasOptions: null
    },
    {
      discount: '50% OFF',
      image: img5,
      deliveryTime: '10 MINS',
      title: 'URGO Premium Red Party Cups / Disposable Glasses',
      quantity: '10 pcs',
      price: '99',
      originalPrice: '199',
      hasOptions: null
    },
    {
      discount: '12% OFF',
      image: img6,
      deliveryTime: '10 MINS',
      title: 'Ezee Premium Garbage Bag (Small, 43 x 51 cm)',
      quantity: '30 pcs',
      price: '54',
      originalPrice: '62',
      hasOptions: '3 options'
    },
    {
      discount: '33% OFF',
      image: img7,
      deliveryTime: '10 MINS',
      title: 'Origami 2 in 1 Kitchen Towel Roll (2 Ply)',
      quantity: '2 x 60 pulls',
      price: '127',
      originalPrice: '190',
      hasOptions: null
    },
    {
      discount: '1% OFF',
      image: img8,
      deliveryTime: '10 MINS',
      title: 'Origami Klassic Toilet Roll (2 Ply)',
      quantity: '320 pulls',
      price: '69',
      originalPrice: '70',
      hasOptions: null
    },
    {
      discount: '25% OFF',
      image: img9,
      deliveryTime: '10 MINS',
      title: 'Freshwrapp Aluminium Foil (2 x 6 m) - Buy 1 Get 1',
      quantity: '2 rolls',
      price: '125',
      originalPrice: '167',
      hasOptions: '2 options'
    },
    {
      discount: '29% OFF',
      image: img10,
      deliveryTime: '10 MINS',
      title: 'The Honest Home Company Paper Kitchen Towel Roll',
      quantity: '2 x 60 pulls',
      price: '159',
      originalPrice: '225',
      hasOptions: null
    },
    {
      discount: '33% OFF',
      image: img11,
      deliveryTime: '10 MINS',
      title: 'Ultra Wrap Bio-Degradable Cling Film (30m)',
      quantity: '1 pc',
      price: '109',
      originalPrice: '165',
      hasOptions: null
    },
    {
      discount: '27% OFF',
      image: img12,
      deliveryTime: '10 MINS',
      title: 'Classi Bio Small Round Disposable Plates (7 inch)',
      quantity: '15 pcs',
      price: '79',
      originalPrice: '109',
      hasOptions: '2 options'
    }
  ];

  const handleAddClick = (product) => {
    // Navigate to product details page with product data
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Home & Office Essentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard 
              key={index} 
              {...product} 
              onAddClick={() => handleAddClick({
                ...product,
                id: index + 1,
                price: parseInt(product.price),
                oldPrice: product.originalPrice ? parseInt(product.originalPrice) : undefined
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}