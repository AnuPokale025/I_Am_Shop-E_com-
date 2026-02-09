import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Playstore from "../assets/appImg/Playstore.png"
import Apple from "../assets/appImg/Apple.png"

export default function Footer() {
  const navigate = useNavigate();

  // Category navigation handlers
  const handleCategoryClick = (category) => {
    switch(category) {
      case 'cold-drinks':
        navigate('/Categories/cold-drink');
        break;
      case 'bakery':
        navigate('/Categories/snack');
        break;
      case 'dry-fruits':
        navigate('/Categories/masala-spices');
        break;
      case 'pet-care':
        navigate('/Categories/pet-care');
        break;
      case 'dairy':
        navigate('/Categories/dairy');
        break;
      case 'instant-food':
        navigate('/Categories/breakfast-instant-food');
        break;
      case 'sauces':
        navigate('/Categories/sauces-spreads');
        break;
      case 'organic':
        navigate('/Categories/organic-products');
        break;
      case 'cleaning':
        navigate('/Categories/cleaning-essentials');
        break;
      case 'tea':
        navigate('/Categories/dairy');
        break;
      case 'atta':
        navigate('/Categories/ata-flours');
        break;
      case 'chicken':
        navigate('/Categories/chicken'); // Updated to proper chicken category route
        break;
      case 'baby-care':
        navigate('/Categories/baby-care');
        break;
      default:
        navigate('/Categories');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600">
          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li className="hover:text-green-600 cursor-pointer hover:underline">Blog</li>
              <li className="hover:text-green-600 cursor-pointer hover:underline">Privacy</li>
              <li className="hover:text-green-600 cursor-pointer hover:underline">Terms</li>
              <li className="hover:text-green-600 cursor-pointer hover:underline">FAQs</li>
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h3 className="font-semibold text-transparent mb-4">.</h3>
          </div>

          {/* Categories Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-900">Categories</h3>
            </div>
            <ul className="space-y-2">
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('cold-drinks')}
              >
                Cold Drinks & Juices
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('bakery')}
              >
                Bakery & Biscuits
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('dry-fruits')}
              >
                Dry Fruits, Masala & Oil
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('pet-care')}
              >
                Pet Care
              </li>
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <ul className="space-y-2 mt-10">
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('dairy')}
              >
                Dairy & Breakfast
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('instant-food')}
              >
                Instant & Frozen Food
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('sauces')}
              >
                Sauces & Spreads
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('organic')}
              >
                Organic & Premium
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('cleaning')}
              >
                Cleaning Essentials
              </li>
            </ul>
          </div>

          {/* Categories Column 3 */}
          <div>
            <ul className="space-y-2 mt-10">
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('tea')}
              >
                Tea, Coffee & Milk Drinks
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('atta')}
              >
                Atta, Rice & Dal
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('chicken')}
              >
                Chicken, Meat & Fish
              </li>
              <li 
                className="hover:text-green-600 cursor-pointer hover:underline"
                onClick={() => handleCategoryClick('baby-care')}
              >
                Baby Care
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* App Buttons */}
          <div className="flex gap-3 items-center">
            <img
              src={Apple}
              alt="App Store"
              className="h-30 "
            />
            <img
              src={Playstore}
              alt="Google Play"
              className="h-20 "
            />
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-gray-600 text-lg">
            <a href="https://www.facebook.com/"><FaFacebookF /></a>
            <a href="https://x.com/"><FaXTwitter /></a>
            <a href="https://www.instagram.com/"><FaInstagram /></a>
            <a href="https://www.linkedin.com/"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}