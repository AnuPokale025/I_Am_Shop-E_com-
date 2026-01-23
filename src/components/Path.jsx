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
import Footer from './Footer.jsx'
import FAQ from '../Pages/FAQ.jsx'

const Path = ({ cartItems, setCartItems }) => {
  return (
    <Routes>
      {/* Public Routes - No Layout */}
      {/* <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> */}

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
        <Route path="/snack" element={<Snacks />} />
        <Route path="/productdetails" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>
    </Routes>
  )
}

export default Path
