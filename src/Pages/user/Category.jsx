import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../api/user.api";
import { categoryData } from "../Categories";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await userAPI.getCategories();

        if (Array.isArray(data) && data.length > 0) {
          const mergedData = data.map((apiCat) => {
            const localCat = categoryData.find(
              (c) => c.name === apiCat.name || c.slug === apiCat.slug
            );

            return {
              ...apiCat,
              image: apiCat.image || localCat?.image,
            };
          });

          setCategories(mergedData);
        } else {
          setCategories(categoryData);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
        setCategories(categoryData);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = () => {
    navigate('/subcategories');
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#f5f7fd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.id}
              onClick={() => handleClick(cat._id || cat.id)}
              className="cursor-pointer bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition"
            >
              {/* <div className="bg-[#f1f3ff] rounded-xl h-20 flex items-center justify-center overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div> */}

              <p className="mt-2 text-sm font-medium text-center">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
