import {
  ArrowLeft,
  User,
  MapPin,
  Package,
  CreditCard,
  LogOut,
  Phone,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Img1 from "../assets/new/emp_png.png";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="ml-auto text-lg font-semibold">My Account</h1>
        </div>

        <div className="grid md:grid-cols-4">
          
          {/* LEFT SIDEBAR */}
          <aside className="bg-gray-50 border-r p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={Img1}
                className="w-24 h-24 rounded-full object-cover mb-3 border"
                alt="profile"
              />
              <h2 className="font-semibold">Aniket Pokale</h2>
              <p className="text-sm text-gray-500">aniketpokale007@gmail.com</p>
            </div>

            {/* <nav className="space-y-2">
              <NavItem icon={User} label="Profile" active />
              <NavItem icon={Package} label="My Orders" />
              <NavItem icon={MapPin} label="Addresses" />
              <NavItem icon={CreditCard} label="Payments" />
              <NavItem icon={LogOut} label="Logout" danger />
            </nav> */}
          </aside>

          {/* RIGHT CONTENT */}
          <main className="md:col-span-3 p-6 md:p-10">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Info label="Full Name" value="Aniket Pokale" />
              <Info label="Mobile Number" value="+91 95117 237**" />
              <Info label="Email Address" value="aniketpokale007@gmail.com" />
              <Info label="Account Type" value="Customer" />
            </div>

            {/* Default Address */}
            <div className="mt-10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin size={18} />
                Default Delivery Address
              </h3>

              <div className="border rounded-xl p-5 bg-gray-50">
                <p className="font-medium">Home</p>
                <p className="text-sm text-gray-600">
                  Flat 301, Shree Apartment,<br />
                  Nagpur, Maharashtra – 440010
                </p>

                <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
                  Manage Addresses
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Edit Profile
              </button>
              <button className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition">
                Change Password
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* Sidebar Item */
const NavItem = ({ icon: Icon, label, active, danger }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
      ${active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}
      ${danger && "text-red-600 hover:bg-red-100"}
    `}
  >
    <Icon size={18} />
    {label}
  </button>
);

/* Info Card */
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);
