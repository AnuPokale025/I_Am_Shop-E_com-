import React from 'react'

const NewCategories = () => {
    return (
        // <div>
        //     <div className="new_categ">
        //         <h1 className='font-bold text-2xl'>Categories</h1>
        //         <h3 className='font-bold text-xl'>Chicken, Meat & Fishes</h3>

        //     </div>
        // </div>
        <div className="w-full bg-white px-6 py-10">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Categories
      </h2>

      {/* Category Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Chicken, Meat &amp; Fish
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              Exotic Meat
            </li>
            <li className="hover:text-black cursor-pointer">
              Chicken
            </li>
            <li className="hover:text-black cursor-pointer">
              Sausage, Salami &amp; Ham
            </li>
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              Fish &amp; Seafood
            </li>
            <li className="hover:text-black cursor-pointer">
              Mutton
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Sweet Tooth
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
             Flavored Yogurt
            </li>
            <li className="hover:text-black cursor-pointer">
              Indian Sweets 
            </li>
            <li className="hover:text-black cursor-pointer">
              Chcolate packs
            </li>
            <li className="hover:text-black cursor-pointer">
              Cakes ans Rolls
            </li>
            <li className="hover:text-black cursor-pointer">
              Syrups
            </li>
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
             Ice Cream and Frozen Desserts
            </li>
            <li className="hover:text-black cursor-pointer">
             Chocolate Bars
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Tea, Coffee and Health Drinks
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              Health Drinks
            </li>
            <li className="hover:text-black cursor-pointer">
             Milk Drinks
            </li>
            <li className="hover:text-black cursor-pointer">
             Tea
            </li>
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
             Coffee
            </li>
            <li className="hover:text-black cursor-pointer">
             Green Tea
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
         Dairy, Bread & Eggs
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
             Cheese
            </li>
            <li className="hover:text-black cursor-pointer">
              Buns and Pav
            </li>
            <li className="hover:text-black cursor-pointer">
              Paneer & Tofu
            </li>
            <li className="hover:text-black cursor-pointer">
              Bread
            </li>
            <li className="hover:text-black cursor-pointer">
              Oats
            </li>
             <li className="hover:text-black cursor-pointer">
              Peanut Butter 
            </li>
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
             Curd and Yogurt
            </li>
            <li className="hover:text-black cursor-pointer">
             Milk
            </li>
            <li className="hover:text-black cursor-pointer">
             Eggs
            </li>
            <li className="hover:text-black cursor-pointer">
             Honey
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Breakfast & Instant Food
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              Energy Bars 
            </li>
            <li className="hover:text-black cursor-pointer">
             Noodles
            </li>
            <li className="hover:text-black cursor-pointer">
             Frozen Veg Snacks
            </li>
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
            Soup
            </li>
            <li className="hover:text-black cursor-pointer">
              Pasta
            </li>
            <li className="hover:text-black cursor-pointer">
             Batter
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Ata, Rice & Dal
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              Moong and Masoor
            </li>
            <li className="hover:text-black cursor-pointer">
             Besn, Sooji and Maida
            </li>
            <li className="hover:text-black cursor-pointer">
             Toor
            </li>
            <li className="hover:text-black cursor-pointer">
             Basmati Rice
            </li><li className="hover:text-black cursor-pointer">
             Toor
            </li>
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
            Rice
            </li>
            <li className="hover:text-black cursor-pointer">
              Poha, Daliya and Other Grains
            </li>
            <li className="hover:text-black cursor-pointer">
             Soya
            </li>
            <li className="hover:text-black cursor-pointer">
             Flours
            </li>
            <li className="hover:text-black cursor-pointer">
             Kabuli Chana
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
         Cleaning Essentials
        </h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
              Detergent Powder and Bars
            </li>
            <li className="hover:text-black cursor-pointer">
             Shoe Polish and Brush
            </li>
            <li className="hover:text-black cursor-pointer">
             Liquid detergent
            </li>
            <li className="hover:text-black cursor-pointer">
             Car Freshners
            </li>
           
          </ul>

          {/* Right column */}
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">
           Toilet Cleaner and ManyMore
            </li>
            <li className="hover:text-black cursor-pointer">
              Air Freshners
            </li>
            <li className="hover:text-black cursor-pointer">
             Soya
            </li>
            <li className="hover:text-black cursor-pointer">
             Flours
            </li>
            <li className="hover:text-black cursor-pointer">
             Kabuli Chana
            </li>
          </ul>
        </div>
      </div>

    </div>

    )
}

export default NewCategories
