import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Img1 from "../assets/new/images.jpg";

export default function MyOrder() {
  const navigate = useNavigate();
  const AddItem = () => {
    navigate("/nav")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow overflow-hidden">
        {/* Back Button */}
        <div className="p-6 border-b">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center p-10">
          <img
            src={Img1}
            alt="No orders"
            className="w-40 mb-6"
          />

          <h2 className="text-lg font-semibold mb-4">
            You haven't placed any orders yet
          </h2>

          <button
            onClick={AddItem}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}