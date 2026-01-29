import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSearch } from "../context/SearchContext.jsx";

// Import all product data from various categories
import amulTaja from "../assets/ProductImages/amul_taja.jpg";
import amulMasti from "../assets/ProductImages/amul_masti.jpg";
import amulGold from "../assets/ProductImages/amul_gold.jpg";
import amulCow from "../assets/ProductImages/amul_cow.jpg";
import amulButter from "../assets/ProductImages/amul_butter.jpg";
import egg from "../assets/ProductImages/egg.jpg";

// Import images for other categories
import img1_babycare from "../assets/Babycare/img1.jpg";
import img2_babycare from "../assets/Babycare/img2.jpg";
import img3_babycare from "../assets/Babycare/img3.jpg";
import img4_babycare from "../assets/Babycare/img4.jpg";
import img5_babycare from "../assets/Babycare/img5.jpg";
import img6_babycare from "../assets/Babycare/img6.jpg";
import img7_babycare from "../assets/Babycare/img7.jpg";
import img8_babycare from "../assets/Babycare/img8.jpg";
import img9_babycare from "../assets/Babycare/img9.jpg";
import img10_babycare from "../assets/Babycare/img10.jpg";
import img11_babycare from "../assets/Babycare/img11.jpg";
import img12_babycare from "../assets/Babycare/img12.jpg";

import img1_cleaning from "../assets/cleaning/img1.avif";
import img2_cleaning from "../assets/cleaning/img2.avif";
import img3_cleaning from "../assets/cleaning/img3.jpg";
import img4_cleaning from "../assets/cleaning/img4.jpg";
import img5_cleaning from "../assets/cleaning/img5.jpg";
import img6_cleaning from "../assets/cleaning/img6.jpg";
import img7_cleaning from "../assets/cleaning/img7.jpg";
import img8_cleaning from "../assets/cleaning/img8.jpg";
import img9_cleaning from "../assets/cleaning/img9.jpg";
import img10_cleaning from "../assets/cleaning/img10.jpg";
import img11_cleaning from "../assets/cleaning/img11.jpg";
import img12_cleaning from "../assets/cleaning/img12.jpg";

import img1_homeoffice from "../assets/homeOffice/img1.avif";
import img2_homeoffice from "../assets/homeOffice/img2.avif";
import img3_homeoffice from "../assets/homeOffice/img3.avif";
import img4_homeoffice from "../assets/homeOffice/img4.avif";
import img5_homeoffice from "../assets/homeOffice/img5.avif";
import img6_homeoffice from "../assets/homeOffice/img6.avif";
import img7_homeoffice from "../assets/homeOffice/img7.avif";
import img8_homeoffice from "../assets/homeOffice/img8.avif";
import img9_homeoffice from "../assets/homeOffice/img9.avif";
import img10_homeoffice from "../assets/homeOffice/img10.avif";
import img11_homeoffice from "../assets/homeOffice/img11.avif";
import img12_homeoffice from "../assets/homeOffice/img12.avif";

import img1_organic from "../assets/organic/img1.avif";
import img2_organic from "../assets/organic/img2.avif";
import img3_organic from "../assets/organic/img3.avif";
import img4_organic from "../assets/organic/img4.avif";
import img5_organic from "../assets/organic/img5.avif";
import img6_organic from "../assets/organic/img6.avif";
import img7_organic from "../assets/organic/img7.avif";
import img8_organic from "../assets/organic/img8.avif";
import img9_organic from "../assets/organic/img9.avif";
import img10_organic from "../assets/organic/img10.avif";
import img11_organic from "../assets/organic/img11.avif";
import img12_organic from "../assets/organic/img12.avif";

import img1_breakfast from "../assets/breakfast/img1.avif";
import img2_breakfast from "../assets/breakfast/img2.avif";
import img3_breakfast from "../assets/breakfast/img3.avif";
import img4_breakfast from "../assets/breakfast/img4.avif";
import img5_breakfast from "../assets/breakfast/img5.avif";
import img6_breakfast from "../assets/breakfast/img6.avif";
import img7_breakfast from "../assets/breakfast/img7.avif";
import img8_breakfast from "../assets/breakfast/img8.avif";
import img9_breakfast from "../assets/breakfast/img9.avif";
import img10_breakfast from "../assets/breakfast/img10.avif";
import img11_breakfast from "../assets/breakfast/img11.avif";
import img12_breakfast from "../assets/breakfast/img12.avif";

import img1_masala from "../assets/masala/img1.avif";
import img2_masala from "../assets/masala/img2.avif";
import img3_masala from "../assets/masala/img3.avif";
import img4_masala from "../assets/masala/img4.avif";
import img5_masala from "../assets/masala/img5.avif";
import img6_masala from "../assets/masala/img6.avif";
import img7_masala from "../assets/masala/img7.avif";
import img8_masala from "../assets/masala/img8.avif";
import img9_masala from "../assets/masala/img9.avif";
import img10_masala from "../assets/masala/img10.avif";
import img11_masala from "../assets/masala/img11.avif";
import img12_masala from "../assets/masala/img12.avif";

import img1_ata from "../assets/ata/img1.avif";
import img2_ata from "../assets/ata/img2.avif";
import img3_ata from "../assets/ata/img3.avif";
import img4_ata from "../assets/ata/img4.avif";
import img5_ata from "../assets/ata/img5.avif";
import img6_ata from "../assets/ata/img6.avif";
import img7_ata from "../assets/ata/img7.avif";
import img8_ata from "../assets/ata/img8.avif";
import img9_ata from "../assets/ata/img9.avif";
import img10_ata from "../assets/ata/img10.avif";
import img11_ata from "../assets/ata/img11.avif";
import img12_ata from "../assets/ata/img12.avif";

import img1_sauce from "../assets/sauce/img1.avif";
import img2_sauce from "../assets/sauce/img2.avif";
import img3_sauce from "../assets/sauce/img3.avif";
import img4_sauce from "../assets/sauce/img4.avif";
import img5_sauce from "../assets/sauce/img5.avif";
import img6_sauce from "../assets/sauce/img6.avif";
import img7_sauce from "../assets/sauce/img7.avif";
import img8_sauce from "../assets/sauce/img8.avif";
import img9_sauce from "../assets/sauce/img9.avif";
import img10_sauce from "../assets/sauce/img10.avif";
import img11_sauce from "../assets/sauce/img11.avif";
import img12_sauce from "../assets/sauce/img12.avif";

// Import cold drink images
import cocaColaImage from "../assets/coldDrink/hell.jpg";
import pepsiImage from "../assets/coldDrink/pepsi_b.jpg";
import spriteImage from "../assets/coldDrink/sprite_l.jpg";
import thumbsUpImage from "../assets/coldDrink/thmubs_u.jpg";
import fantaImage from "../assets/coldDrink/Fanta.jpg";
import mountainDewImage from "../assets/coldDrink/mountain_dew.jpg";
import sevenUpImage from "../assets/coldDrink/7_up.jpg";
import redBullImage from "../assets/coldDrink/red_bull.jpg";

// Dairy Products
const dairyProducts = [
  {
    id: 1,
    name: "Amul Taaza Toned Milk",
    qty: "500 ml",
    price: 28,
    img: amulTaja,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 2,
    name: "Amul Masti Pouch Curd",
    qty: "390 g",
    price: 35,
    img: amulMasti,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 3,
    name: "Amul Gold Full Cream Milk",
    qty: "500 ml",
    price: 35,
    img: amulGold,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 4,
    name: "Amul Cow Milk",
    qty: "500 ml",
    price: 28,
    img: amulCow,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 5,
    name: "Amul Salted Butter",
    qty: "100 g",
    price: 58,
    img: amulButter,
    category: "Dairy, Bread & Eggs"
  },
  {
    id: 6,
    name: "Yolkers Classic White Eggs",
    qty: "6 pcs",
    price: 57,
    oldPrice: 66,
    img: egg,
    category: "Dairy, Bread & Eggs"
  }
];

// Snack Products
const snackProducts = [
  {
    id: "snack-1",
    name: "Bingo Mad Angles",
    qty: "104 g",
    price: 10,
    img: "https://via.placeholder.com/150?text=Bingo+Mad+Angles",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-2",
    name: "Lays Classic Chips",
    qty: "52 g",
    price: 10,
    img: "https://via.placeholder.com/150?text=Lays+Chips",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-3",
    name: "Kurkure Spicy Twist",
    qty: "52 g",
    price: 10,
    img: "https://via.placeholder.com/150?text=Kurkure",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-4",
    name: "Parle-G Biscuits",
    qty: "800 g",
    price: 40,
    oldPrice: 50,
    discount: "20% OFF",
    img: "https://via.placeholder.com/150?text=Parle+G",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-5",
    name: "Britannia Marie Gold",
    qty: "150 g",
    price: 12,
    img: "https://via.placeholder.com/150?text=Marie+Gold",
    category: "Snacks & Branded Foods"
  },
  {
    id: "snack-6",
    name: "Oreo Chocolate Cookies",
    qty: "100 g",
    price: 12,
    img: "https://via.placeholder.com/150?text=Oreo",
    category: "Snacks & Branded Foods"
  }
];

// Cold Drink Products
const coldDrinks = [
  {
    id: "cold-1",
    name: "Coca-Cola Original",
    qty: "750 ml",
    price: 40,
    oldPrice: 45,
    discount: "11% OFF",
    img: cocaColaImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-2",
    name: "Pepsi Black",
    qty: "750 ml",
    price: 40,
    img: pepsiImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-3",
    name: "Sprite Lemon Lime",
    qty: "750 ml",
    price: 40,
    img: spriteImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-4",
    name: "Thumbs Up",
    qty: "750 ml",
    price: 40,
    img: thumbsUpImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-5",
    name: "Fanta Orange",
    qty: "750 ml",
    price: 40,
    img: fantaImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-6",
    name: "Mountain Dew",
    qty: "750 ml",
    price: 40,
    oldPrice: 45,
    discount: "11% OFF",
    img: mountainDewImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-7",
    name: "7UP Lemon Lime",
    qty: "750 ml",
    price: 40,
    img: sevenUpImage,
    category: "Cold Drinks & Juices"
  },
  {
    id: "cold-8",
    name: "Red Bull Energy Drink",
    qty: "250 ml",
    price: 125,
    img: redBullImage,
    category: "Cold Drinks & Juices"
  }
];

// Baby Care Products
const babyCareProducts = [
  {
    id: "baby-1",
    name: "Little's Fluffy Soft Pant Style Baby Diaper (XL)",
    qty: "24 pcs",
    price: 275,
    oldPrice: 420,
    discount: "34% OFF",
    time: "10 MINS",
    image: img1_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-2",
    name: "Pampers Premium Care Pant Style Baby Diaper",
    qty: "26 pcs",
    price: 753,
    oldPrice: 840,
    discount: "10% OFF",
    time: "10 MINS",
    image: img2_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-3",
    name: "Huggies Wonder Pant Style Baby Diaper",
    qty: "86 pcs",
    price: 628,
    oldPrice: 1299,
    discount: "51% OFF",
    time: "21 MINS",
    image: img3_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-4",
    name: "Johnson's Baby Powder",
    qty: "150g",
    price: 180,
    oldPrice: 220,
    discount: "18% OFF",
    time: "15 MINS",
    image: img4_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-5",
    name: "Pampers Baby Wipes",
    qty: "80 pcs",
    price: 120,
    oldPrice: 150,
    discount: "20% OFF",
    time: "12 MINS",
    image: img5_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-6",
    name: "Chicco Baby Shampoo",
    qty: "200ml",
    price: 299,
    oldPrice: 350,
    discount: "15% OFF",
    time: "10 MINS",
    image: img6_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-7",
    name: "Pigeon Baby Soap",
    qty: "125g",
    price: 95,
    oldPrice: 120,
    discount: "21% OFF",
    time: "10 MINS",
    image: img7_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-8",
    name: "Mustela Baby Lotion",
    qty: "200ml",
    price: 450,
    oldPrice: 520,
    discount: "13% OFF",
    time: "18 MINS",
    image: img8_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-9",
    name: "Himalaya Baby Oil",
    qty: "150ml",
    price: 175,
    oldPrice: 200,
    discount: "13% OFF",
    time: "10 MINS",
    image: img9_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-10",
    name: "Sebamed Baby Wash",
    qty: "200ml",
    price: 320,
    oldPrice: 380,
    discount: "16% OFF",
    time: "15 MINS",
    image: img10_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-11",
    name: "Mamaearth Gentle Cleansing Lotion",
    qty: "100ml",
    price: 249,
    oldPrice: 299,
    discount: "17% OFF",
    time: "12 MINS",
    image: img11_babycare,
    category: "Baby Care"
  },
  {
    id: "baby-12",
    name: "Aveeno Baby Daily Moisture Lotion",
    qty: "180ml",
    price: 520,
    oldPrice: 600,
    discount: "13% OFF",
    time: "20 MINS",
    image: img12_babycare,
    category: "Baby Care"
  }
];

// Cleaning Products
const cleaningProducts = [
  {
    id: "clean-1",
    name: "Softspun Microfiber Mesh Wire Steel",
    qty: "5 pcs",
    price: 112,
    oldPrice: 312,
    discount: "64% OFF",
    time: "10 MINS",
    image: img1_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-2",
    name: "Scotch Brite Sponge Scrub",
    qty: "3 pcs",
    price: 74,
    oldPrice: 75,
    discount: "1% OFF",
    time: "10 MINS",
    image: img2_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-3",
    name: "Scotch Brite Stainless Steel Scrubber",
    qty: "1 pc",
    price: 30,
    time: "10 MINS",
    image: img3_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-4",
    name: "Scotch Brite Stainless Steel Scrubber Ball",
    qty: "1 pc",
    price: 20,
    time: "10 MINS",
    image: img4_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-5",
    name: "Exo Steel Scrubber",
    qty: "1 pc",
    price: 14,
    oldPrice: 15,
    discount: "6% OFF",
    time: "10 MINS",
    image: img5_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-6",
    name: "Scotch Brite Silver Sparks Scrub Pad",
    qty: "3 pcs",
    price: 55,
    time: "10 MINS",
    image: img6_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-7",
    name: "Harpic Toilet Cleaner",
    qty: "1 Ltr",
    price: 85,
    oldPrice: 95,
    discount: "11% OFF",
    time: "15 MINS",
    image: img7_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-8",
    name: "Domex Disinfectant Toilet Cleaner",
    qty: "500 ml",
    price: 65,
    time: "10 MINS",
    image: img8_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-9",
    name: "Vim Dishwash Gel",
    qty: "750 ml",
    price: 72,
    oldPrice: 80,
    discount: "10% OFF",
    time: "10 MINS",
    image: img9_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-10",
    name: "Surf Excel Easy Wash",
    qty: "1 kg",
    price: 125,
    oldPrice: 140,
    discount: "11% OFF",
    time: "12 MINS",
    image: img10_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-11",
    name: "Ariel Matic Washing Powder",
    qty: "2 kg",
    price: 280,
    oldPrice: 320,
    discount: "13% OFF",
    time: "15 MINS",
    image: img11_cleaning,
    category: "Cleaning Essentials"
  },
  {
    id: "clean-12",
    name: "Lizol Floor Cleaner",
    qty: "1 Ltr",
    price: 95,
    oldPrice: 110,
    discount: "14% OFF",
    time: "10 MINS",
    image: img12_cleaning,
    category: "Cleaning Essentials"
  }
];

// Home & Office Products
const homeOfficeProducts = [
  {
    id: "home-1",
    name: "Kressa Savvy Toilet Roll (2 Ply)",
    qty: "6 rolls",
    price: 149,
    oldPrice: 275,
    discount: "33% OFF",
    time: "21 MINS",
    image: img1_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-2",
    name: "Ezee Premium Garbage Bag (Medium, 48 x 56 cm)",
    qty: "30 pcs",
    price: 66,
    oldPrice: 72,
    discount: "8% OFF",
    time: "10 MINS",
    image: img2_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-3",
    name: "Ezee Premium Garbage Bag (Large, 60 x 81 cm)",
    qty: "15 pcs",
    price: 81,
    oldPrice: 90,
    discount: "10% OFF",
    time: "10 MINS",
    image: img3_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-4",
    name: "Savlon Germ Protection Antiseptic Wipes",
    qty: "72 pcs",
    price: 196,
    oldPrice: 210,
    discount: "7% OFF",
    time: "10 MINS",
    image: img4_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-5",
    name: "URGO Premium Red Party Cups / Disposable Glasses",
    qty: "10 pcs",
    price: 99,
    oldPrice: 199,
    discount: "50% OFF",
    time: "10 MINS",
    image: img5_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-6",
    name: "Ezee Premium Garbage Bag (Small, 43 x 51 cm)",
    qty: "30 pcs",
    price: 54,
    oldPrice: 62,
    discount: "12% OFF",
    time: "10 MINS",
    image: img6_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-7",
    name: "Origami 2 in 1 Kitchen Towel Roll (2 Ply)",
    qty: "2 x 60 pulls",
    price: 127,
    oldPrice: 190,
    discount: "33% OFF",
    time: "10 MINS",
    image: img7_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-8",
    name: "Origami Klassic Toilet Roll (2 Ply)",
    qty: "320 pulls",
    price: 69,
    oldPrice: 70,
    discount: "1% OFF",
    time: "10 MINS",
    image: img8_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-9",
    name: "Freshwrapp Aluminium Foil (2 x 6 m) - Buy 1 Get 1",
    qty: "2 rolls",
    price: 125,
    oldPrice: 167,
    discount: "25% OFF",
    time: "10 MINS",
    image: img9_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-10",
    name: "The Honest Home Company Paper Kitchen Towel Roll",
    qty: "2 x 60 pulls",
    price: 159,
    oldPrice: 225,
    discount: "29% OFF",
    time: "10 MINS",
    image: img10_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-11",
    name: "Ultra Wrap Bio-Degradable Cling Film (30m)",
    qty: "1 pc",
    price: 109,
    oldPrice: 165,
    discount: "33% OFF",
    time: "10 MINS",
    image: img11_homeoffice,
    category: "Home & Office"
  },
  {
    id: "home-12",
    name: "Classi Bio Small Round Disposable Plates (7 inch)",
    qty: "15 pcs",
    price: 79,
    oldPrice: 109,
    discount: "27% OFF",
    time: "10 MINS",
    image: img12_homeoffice,
    category: "Home & Office"
  }
];

// Organic Products
const organicProducts = [
  {
    id: "org-1",
    name: "Organic Tattva Organic Ragi Flour",
    qty: "500 g",
    price: 80,
    oldPrice: 95,
    discount: "15% OFF",
    time: "10 MINS",
    image: img1_organic,
    category: "Organic Products"
  },
  {
    id: "org-2",
    name: "True Story Organic Jowar Flour",
    qty: "500 g",
    price: 57,
    oldPrice: 75,
    discount: "24% OFF",
    time: "10 MINS",
    image: img2_organic,
    category: "Organic Products"
  },
  {
    id: "org-3",
    name: "True Story 100% Pure Organic Ragi Flour",
    qty: "500 g",
    price: 67,
    oldPrice: 80,
    discount: "16% OFF",
    time: "10 MINS",
    image: img3_organic,
    category: "Organic Products"
  },
  {
    id: "org-4",
    name: "True Story Organic Bajra Flour",
    qty: "500 g",
    price: 48,
    oldPrice: 75,
    discount: "36% OFF",
    time: "10 MINS",
    image: img4_organic,
    category: "Organic Products"
  },
  {
    id: "org-5",
    name: "Pro Nature Organic Red Poha",
    qty: "500 g",
    price: 91,
    oldPrice: 96,
    discount: "5% OFF",
    time: "10 MINS",
    image: img5_organic,
    category: "Organic Products"
  },
  {
    id: "org-6",
    name: "24 Mantra Organic Idly Rava / Sooji",
    qty: "500 g",
    price: 60,
    oldPrice: 65,
    discount: "7% OFF",
    time: "10 MINS",
    image: img6_organic,
    category: "Organic Products"
  },
  {
    id: "org-7",
    name: "Organic Tattva Organic Whole Wheat Flour",
    qty: "1 kg",
    price: 75,
    oldPrice: 85,
    discount: "12% OFF",
    time: "10 MINS",
    image: img7_organic,
    category: "Organic Products"
  },
  {
    id: "org-8",
    name: "True Story Organic Millet Mix",
    qty: "500 g",
    price: 120,
    oldPrice: 140,
    discount: "14% OFF",
    time: "10 MINS",
    image: img8_organic,
    category: "Organic Products"
  },
  {
    id: "org-9",
    name: "Pro Nature Organic Brown Rice",
    qty: "1 kg",
    price: 110,
    oldPrice: 130,
    discount: "15% OFF",
    time: "10 MINS",
    image: img9_organic,
    category: "Organic Products"
  },
  {
    id: "org-10",
    name: "24 Mantra Organic Quinoa",
    qty: "500 g",
    price: 180,
    oldPrice: 200,
    discount: "10% OFF",
    time: "10 MINS",
    image: img10_organic,
    category: "Organic Products"
  },
  {
    id: "org-11",
    name: "Organic Tattva Organic Besan",
    qty: "500 g",
    price: 65,
    oldPrice: 75,
    discount: "13% OFF",
    time: "10 MINS",
    image: img11_organic,
    category: "Organic Products"
  },
  {
    id: "org-12",
    name: "True Story Organic Moong Dal",
    qty: "500 g",
    price: 85,
    oldPrice: 95,
    discount: "11% OFF",
    time: "10 MINS",
    image: img12_organic,
    category: "Organic Products"
  }
];

// Breakfast Products
const breakfastProducts = [
  {
    id: "bf-1",
    name: "Kellogg's Double Chocolaty Fills Chocos",
    qty: "250 g",
    price: 165,
    oldPrice: 182,
    discount: "9% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img1_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-2",
    name: "Kellogg's Corn Flakes with Immuno Nutrients",
    qty: "250 g",
    price: 111,
    time: "10 MINS",
    image: img2_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-3",
    name: "Kellogg's Multigrain Chocos More",
    qty: "385 g",
    price: 199,
    options: "2 options",
    time: "10 MINS",
    image: img3_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-4",
    name: "Kellogg's Chocos Crunchy Bites Kids",
    qty: "375 g",
    price: 179,
    oldPrice: 199,
    discount: "10% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img4_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-5",
    name: "Kellogg's Froot Loops Crunchy Multigrain",
    qty: "2 x 285 g",
    price: 348,
    oldPrice: 382,
    discount: "8% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img5_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-6",
    name: "Kellogg's Real Almond Honey Corn Flakes",
    qty: "1 kg",
    price: 366,
    oldPrice: 516,
    discount: "29% OFF",
    time: "10 MINS",
    image: img6_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-7",
    name: "Kellogg's Corn Flakes Original",
    qty: "1.15 kg",
    price: 336,
    oldPrice: 471,
    discount: "28% OFF",
    time: "10 MINS",
    image: img7_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-8",
    name: "Kellogg's Multigrain Chocos Variety Pack",
    qty: "7 pcs",
    price: 64,
    oldPrice: 70,
    discount: "8% OFF",
    options: "3 options",
    time: "10 MINS",
    image: img8_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-9",
    name: "Kellogg's Corn Flakes With Real Honey",
    qty: "300 g",
    price: 167,
    oldPrice: 177,
    discount: "5% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img9_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-10",
    name: "Kwality Multigrain Chocos & Cereal Combo",
    qty: "102 g",
    price: 48,
    oldPrice: 60,
    discount: "20% OFF",
    time: "10 MINS",
    image: img10_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-11",
    name: "Kellogg's Multigrain Chocos More",
    qty: "1.1 kg",
    price: 454,
    oldPrice: 489,
    discount: "7% OFF",
    time: "10 MINS",
    image: img11_breakfast,
    category: "Breakfast & Instant Food"
  },
  {
    id: "bf-12",
    name: "Kellogg's Multigrain Chocos Moons & Stars",
    qty: "1.2 kg",
    price: 349,
    oldPrice: 666,
    discount: "47% OFF",
    time: "10 MINS",
    image: img12_breakfast,
    category: "Breakfast & Instant Food"
  }
];

// Masala Products
const masalaProducts = [
  {
    id: "mas-1",
    name: "Pushp Pickle Masala",
    qty: "200 g",
    price: 68,
    oldPrice: 85,
    discount: "20% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img1_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-2",
    name: "Maggi Masala-ae-Magic Sabzi Masala",
    qty: "72 g",
    price: 55,
    oldPrice: 60,
    discount: "8% OFF",
    time: "10 MINS",
    image: img2_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-3",
    name: "Everest Coriander Powder / Dhania",
    qty: "100 g",
    price: 36,
    oldPrice: 40,
    discount: "10% OFF",
    time: "10 MINS",
    image: img3_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-4",
    name: "Suruchi Classic Chilli Powder",
    qty: "100 g",
    price: 38,
    time: "10 MINS",
    image: img4_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-5",
    name: "Pushp Shahi Compounded Hing",
    qty: "50 g",
    price: 341,
    oldPrice: 395,
    discount: "13% OFF",
    time: "10 MINS",
    image: img5_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-6",
    name: "Whole Farm Premium Desiccated Coconut",
    qty: "100 g",
    price: 48,
    oldPrice: 80,
    discount: "40% OFF",
    time: "10 MINS",
    image: img6_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-7",
    name: "Everest Kashmiri Red Chilli Powder",
    qty: "100 g",
    price: 93,
    oldPrice: 106,
    discount: "12% OFF",
    time: "10 MINS",
    image: img7_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-8",
    name: "Everest Tikhalal Red Chilli Powder",
    qty: "100 g",
    price: 50,
    oldPrice: 58,
    discount: "13% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img8_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-9",
    name: "Suruchi Classic Coriander Powder",
    qty: "500 g",
    price: 141,
    oldPrice: 143,
    time: "10 MINS",
    image: img9_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-10",
    name: "Everest Sambhar Masala",
    qty: "100 g",
    price: 86,
    time: "10 MINS",
    image: img10_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-11",
    name: "Catch Sprinklers - Chat Masala",
    qty: "100 g",
    price: 90,
    time: "10 MINS",
    image: img11_masala,
    category: "Masala & Spices"
  },
  {
    id: "mas-12",
    name: "Suruchi Classic Amchur Powder",
    qty: "50 g",
    price: 26,
    time: "10 MINS",
    image: img12_masala,
    category: "Masala & Spices"
  }
];

// Ata Products
const ataProducts = [
  {
    id: "ata-1",
    name: "Aashirvaad Shudh Chakki Atta (100%)",
    qty: "5 kg",
    price: 252,
    oldPrice: 263,
    discount: "20% OFF",
    time: "10 MINS",
    image: img1_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-2",
    name: "Fortune Chakki Fresh Atta",
    qty: "5 kg",
    price: 220,
    oldPrice: 277,
    discount: "8% OFF",
    time: "10 MINS",
    image: img2_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-3",
    name: "Aashirvaad Shudh Chakki Atta",
    qty: "10 kg",
    price: 471,
    oldPrice: 516,
    discount: "8% OFF",
    time: "10 MINS",
    image: img3_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-4",
    name: "Aashirvaad Select MP Sharbati Atta",
    qty: "5 kg",
    price: 339,
    oldPrice: 378,
    discount: "10% OFF",
    time: "10 MINS",
    image: img4_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-5",
    name: "Aashirvaad High Fibre Multigrain Atta",
    qty: "5 kg",
    price: 330,
    oldPrice: 394,
    discount: "15% OFF",
    time: "10 MINS",
    image: img5_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-6",
    name: "Pillsbury Chakki Fresh Atta",
    qty: "5 kg",
    price: 236,
    oldPrice: 283,
    discount: "16% OFF",
    time: "10 MINS",
    image: img6_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-7",
    name: "Organic Tattva Organic Ragi Flour",
    qty: "500 g",
    price: 80,
    oldPrice: 95,
    discount: "15% OFF",
    time: "10 MINS",
    image: img7_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-8",
    name: "Fortune Premium MP Sharbati Atta",
    qty: "5 kg",
    price: 319,
    oldPrice: 385,
    discount: "17% OFF",
    time: "10 MINS",
    image: img8_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-9",
    name: "Whole Farm Chakki Atta",
    qty: "5 kg",
    price: 200,
    oldPrice: 290,
    discount: "31% OFF",
    time: "10 MINS",
    image: img9_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-10",
    name: "True Story Organic Jowar Flour",
    qty: "500 g",
    price: 57,
    oldPrice: 75,
    discount: "24% OFF",
    time: "10 MINS",
    image: img10_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-11",
    name: "True Story Organic Ragi Flour",
    qty: "500 g",
    price: 67,
    oldPrice: 80,
    discount: "16% OFF",
    time: "10 MINS",
    image: img11_ata,
    category: "Atta, Flours & Sooji"
  },
  {
    id: "ata-12",
    name: "True Story Organic Bajra Flour",
    qty: "500 g",
    price: 48,
    oldPrice: 75,
    discount: "36% OFF",
    options: "2 options",
    time: "10 MINS",
    image: img12_ata,
    category: "Atta, Flours & Sooji"
  }
];

// Sauce Products
const sauceProducts = [
  {
    id: "sauce-1",
    name: "Maggi Rich Tomato Ketchup",
    qty: "190 g",
    price: 70,
    time: "10 MINS",
    image: img1_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-2",
    name: "Del Monte Tomato Ketchup",
    qty: "900 g",
    price: 85,
    oldPrice: 120,
    discount: "29% OFF",
    time: "10 MINS",
    image: img2_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-3",
    name: "Veeba Chef's Special Tomato Ketchup",
    qty: "900 g",
    price: 79,
    oldPrice: 113,
    discount: "30% OFF",
    time: "10 MINS",
    image: img3_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-4",
    name: "Chokhi Dhani Tomato Ketchup",
    qty: "950 g",
    price: 99,
    oldPrice: 150,
    discount: "34% OFF",
    time: "21 MINS",
    image: img4_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-5",
    name: "Kissan Fresh Tomato Ketchup",
    qty: "1.1 kg",
    price: 117,
    oldPrice: 140,
    discount: "16% OFF",
    time: "10 MINS",
    image: img5_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-6",
    name: "Kissan Tomato Ketchup",
    qty: "850 g",
    price: 93,
    time: "10 MINS",
    image: img6_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-7",
    name: "Kissan Tomato Ketchup (No Onion & Garlic)",
    qty: "850 g",
    price: 110,
    oldPrice: 120,
    discount: "8% OFF",
    time: "10 MINS",
    image: img7_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-8",
    name: "Little Joys Tomato Sauce - No Added Sugar",
    qty: "320 g",
    price: 349,
    time: "10 MINS",
    image: img8_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-9",
    name: "Maggi Rich Tomato Ketchup",
    qty: "960 g",
    price: 144,
    oldPrice: 159,
    discount: "9% OFF",
    time: "10 MINS",
    image: img9_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-10",
    name: "The True Tomato Ketchup (Classic)",
    qty: "220 g",
    price: 229,
    oldPrice: 249,
    discount: "8% OFF",
    time: "21 MINS",
    image: img10_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-11",
    name: "Troovy Healthy Tomato Ketchup",
    qty: "340 g",
    price: 165,
    time: "10 MINS",
    image: img11_sauce,
    category: "Sauces & Spreads"
  },
  {
    id: "sauce-12",
    name: "Heinz Tomato Ketchup",
    qty: "435 g",
    price: 146,
    oldPrice: 155,
    time: "10 MINS",
    outOfStock: true,
    image: img12_sauce,
    category: "Sauces & Spreads"
  }
];

// Combine all products
const allProducts = [
  ...dairyProducts,
  ...snackProducts,
  ...coldDrinks,
  ...babyCareProducts,
  ...cleaningProducts,
  ...homeOfficeProducts,
  ...organicProducts,
  ...breakfastProducts,
  ...masalaProducts,
  ...ataProducts,
  ...sauceProducts
];

const SearchResults = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const [searchParams] = useSearchParams();

  // Get search term from either context or URL params
  const searchTerm = searchQuery || searchParams.get('q') || '';

  // Filter all products based on search term
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-6 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={goBack}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <p className="text-gray-600 text-sm mt-1">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        </div>
      </div>

      {/* Search Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try searching for something else</p>
          <button
            onClick={goBack}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border p-3 flex flex-col justify-between hover:shadow-lg transition-shadow relative"
            >
              {item.discount && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-md font-semibold">
                  {item.discount}
                </span>
              )}

              {/* Image */}
              <img
                src={item.img || item.image}
                alt={item.name}
                className="h-32 object-contain mx-auto"
              />

              {/* Category */}
              <div className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                <span>{item.category}</span>
              </div>

              {/* Name */}
              <h3 className="text-sm font-medium mt-1 line-clamp-2">
                {item.name}
              </h3>

              {/* Quantity */}
              <p className="text-xs text-gray-500">{item.qty}</p>

              {/* Price + Button */}
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="font-semibold">₹{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-xs line-through text-gray-400 ml-1">
                      ₹{item.oldPrice}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleAddClick(item)}
                  className="border border-green-600 text-green-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-green-50"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;