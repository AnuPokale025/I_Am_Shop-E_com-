import { useNavigate } from "react-router-dom";

import dairyImg from "../assets/categories/bakery.jpg";
import coldDrinkImg from "../assets/categories/cold drink.jpg";
import snacksImg from "../assets/categories/chips.jpg";
import babyCareImg from "../assets/categories/baby care.jpg";
import cleaningEssentialsImg from "../assets/categories/cleaning essentials.jpg";
import homeOfficeImg from "../assets/categories/home and office.jpg";
import organicImg from "../assets/categories/organic.jpg";
import breakfastFoodImg from "../assets/categories/breakfast instant food.jpg";
import masalaImg from "../assets/categories/masala.jpg";
import ataImg from "../assets/categories/ata.jpg";
import saucesImg from "../assets/categories/sauces.jpg";
import petCareImg from "../assets/categories/pet.jpg";


const categories = [
  { id: 1, name: "Dairy, Bread & Eggs", img: dairyImg, slug: "dairy-bread-eggs" },
  { id: 2, name: "Cold Drinks & Juices", img: coldDrinkImg, slug: "cold-drinks-juices" },
  { id: 3, name: "Snacks & Munchies", img: snacksImg, slug: "snacks-munchies" },
  { id: 4, name: "Baby Care", img: babyCareImg, slug: "baby-care" },
  { id: 5, name: "Cleaning Essentials", img: cleaningEssentialsImg, slug: "cleaning-essentials" },
  { id: 6, name: "Home & Office", img: homeOfficeImg, slug: "home-office" },
  { id: 7, name: "Organic Products", img: organicImg, slug: "organic-products" },
  { id: 8, name: "Breakfast & Instant Food", img: breakfastFoodImg, slug: "breakfast-instant-food" },
  { id: 9, name: "Masala & Spices", img: masalaImg, slug: "masala-spices" },
  { id: 10, name: "Ata & Flours", img: ataImg, slug: "ata-flours" },
  { id :11, name : "Sauces & Spreads", img: saucesImg, slug: "sauces-spreads" },
  { id : 12, name : "Pet Care", img: petCareImg, slug: "pet-care" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-xl font-semibold">Shop by Category</h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/Categories/${cat.slug}`)}
            className="cursor-pointer text-center"
          >
            <div className="mx-auto h-44 w-44 overflow-hidden rounded-3xl transition-transform hover:scale-105">
              <img
                src={cat.img}
                alt={cat.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
