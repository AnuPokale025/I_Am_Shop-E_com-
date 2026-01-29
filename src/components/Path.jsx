import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from "../Pages/Layout.jsx"

// import Signup from "../components/Signup.jsx"
// import Login from "../components/Login.jsx"
import Address from "../Pages/Address.jsx"
import Order from "../Pages/MyOrders.jsx"
import Categories from '../Pages/Categories.jsx'
import Snacks from '../Pages/Snacks.jsx'
import ProductDetail from '../Pages/ProductDetails.jsx'
import Profile from '../Pages/Profile.jsx'
import ProductSection from '../Pages/ProductSection.jsx'
import AllProducts from '../Pages/AllProducts.jsx'
import ColdDrinks from '../Pages/ColdDrinks.jsx'
import AllColdDrinks from '../Pages/AllColdDrinks.jsx'
import SearchResults from '../Pages/SearchResults.jsx'
import Login from "../components/Login.jsx"
import Signup from "../components/Signup.jsx"
import Footer from './Footer.jsx'
import FAQ from '../Pages/FAQ.jsx'
import { LogOut } from 'lucide-react'
import BabyCare from '../Pages/BabyCare.jsx'
import Cleaning from '../Pages/Cleaning.jsx'
import Home_Office from '../Pages/Home_Office.jsx'
import OrganicProducts from '../Pages/OrganicProduct.jsx'
import BreakfastProducts from '../Pages/BreakfastProduct.jsx'
import MasalaProducts from '../Pages/MasalaProducts.jsx'
import AtaProducts from '../Pages/AtaProducts.jsx'
import SauceProducts from '../Pages/Sauceproducts.jsx'

const Path = ({ cartItems, setCartItems }) => {
  return (
    <Routes>
      {/* Public Routes - No Layout */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<LogOut/>} />

      {/* Protected Routes - With Layout (Navbar on all pages) */}
      <Route element={<Layout cartItems={cartItems} setCartItems={setCartItems} />}>        
        <Route path="/nav" element={
          <>
            <Categories />
            <ProductSection />
            <ColdDrinks />
            <Snacks />
            <Footer />
          </>
        } />
        <Route path="/search" element={<SearchResults cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/allcolddrinks" element={<AllColdDrinks />} />
        <Route path="/add" element={<Address />} />
        <Route path="/order" element={<Order />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Categories/dairy" element={<ProductSection/>} />
        <Route path="/Categories/cold-drink" element={<ColdDrinks />} />
        <Route path="/Categories/snack" element={<Snacks />} />
        <Route path="/Categories/baby-care" element={<BabyCare />} />
        <Route path="/Categories/cleaning-essentials" element={<Cleaning />} />
        <Route path="/Categories/home-office" element={<Home_Office />} />
        <Route path="/Categories/organic-products" element={<OrganicProducts />} />
        <Route path="/Categories/breakfast-instant-food" element={<BreakfastProducts />} />
        <Route path="/Categories/masala-spices" element={<MasalaProducts />} />
        <Route path="/Categories/ata-flours" element={<AtaProducts />} />
        <Route path="/Categories/sauces-spreads" element={<SauceProducts />} />
        <Route path="/snack" element={<Snacks />} />
        <Route path="/productdetails" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/babycare" element={<BabyCare />} />
       
      </Route>
    </Routes>
  )
}

export default Path