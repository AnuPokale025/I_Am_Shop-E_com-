import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userAPI from "../../api/user.api";

const SubCategory = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchSubCategories();
  }, [categoryId]);

  const fetchSubCategories = async () => {
    try {
      const data = await userAPI.getSubCategories(categoryId);


      setSubCategories(data || []);
    } catch (error) {
      console.error("Subcategory fetch error:", error);
    }
  };

  const handleClick = (subId) => {
    navigate(`/subcategory/${subId}/products`);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fd] p-6">
      <h2 className="text-2xl font-bold mb-6">Select Sub Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subCategories.map((sub) => (
          <div
            key={sub._id || sub.id}
            onClick={() => handleClick(sub._id || sub.id)}
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md"
          >
            <p className="text-center font-medium">{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
