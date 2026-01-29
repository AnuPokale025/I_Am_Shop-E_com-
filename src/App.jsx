import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Path from "./components/Path.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import BabyCare from "./Pages/BabyCare.jsx";
import Cleaning from "./Pages/Cleaning.jsx";



function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <SearchProvider>
        <Path cartItems={cartItems} setCartItems={setCartItems} />
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App
