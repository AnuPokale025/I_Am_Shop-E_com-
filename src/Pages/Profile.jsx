import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Img1 from "../assets/new/emp_png.png";

export default function Address() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow p-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                {/* Content */}
                <div className="content flex justify-between ">
                    <div className="pic">
                        <img className="w-30 mb-6" src={Img1} alt="" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-2xl font-semibold mb-6">Profile</h1>
                        <h2 className="text-lg font-semibold mb-1">Aniket Pokale</h2>
                        <p>+91 95117237**</p>
                        <p>aniketpokale007@gmail.com</p>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}