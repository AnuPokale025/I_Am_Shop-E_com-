import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import Playstore from "../assets/appImg/Playstore.png"
import Apple from "../assets/appImg/Apple.png"
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600">
          
          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>FAQs</li>
              <li>Security</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h3 className="font-semibold text-transparent mb-4">.</h3>
            {/* <ul className="space-y-2">
              <li>Partner</li>
              <li>Franchise</li>
              <li>Seller</li>
              <li>Warehouse</li>
              <li>Deliver</li>
              <li>Resources</li>
            </ul> */}
          </div>

          {/* Categories Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-900">Categories</h3>
             
            </div>
            <ul className="space-y-2">
              
              <li>Cold Drinks & Juices</li>
              <li>Bakery & Biscuits</li>
              <li>Dry Fruits, Masala & Oil</li>
               <li>Pet Care</li>
              <li>Fashion & Accessories</li>
              <li>Kitchen & Dining</li>
              <li>Stationery Needs</li>
             
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <ul className="space-y-2 mt-10">
              <li>Dairy & Breakfast</li>
              <li>Instant & Frozen Food</li>
              <li>Sweet Tooth</li>
              <li>Sauces & Spreads</li>
              <li>Organic & Premium</li>
              <li>Cleaning Essentials</li>
             
             
             
            </ul>
          </div>

          {/* Categories Column 3 */}
          <div>
            <ul className="space-y-2 mt-10">
              <li>Munchies</li>
              <li>Tea, Coffee & Milk Drinks</li>
              <li>Atta, Rice & Dal</li>
              <li>Chicken, Meat & Fish</li>
              <li>Baby Care</li>
              <li>Home Furnishing & Decor</li>
              
             
             
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* <p className="text-xs text-gray-500">
            © Blink Commerce Private Limited, 2016-2026
          </p> */}

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
