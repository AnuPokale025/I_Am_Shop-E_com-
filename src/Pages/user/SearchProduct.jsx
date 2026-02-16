import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import productAPI from "../../api/product.api";

const SearchProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // ✅ Fetch All Products Only Once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAllProducts();
        setAllProducts(data || []);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= GET IMAGE FROM YOUR BODY ================= */
  const getProductImage = (product) => {
    if (!product.images || product.images.length === 0) {
      return "/placeholder.png";
    }

    // Try to find primary image
    const primaryImage = product.images.find((img) => img.primary);

    return (
      primaryImage?.imageUrl ||
      product.images[0]?.imageUrl ||
      "/placeholder.png"
    );
  };

  // ✅ Static Filter by Product Name
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product?.name
        ?.toLowerCase()
        .includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [query, allProducts]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-6">
        {query
          ? `Search Results for "${query}"`
          : "All Products"}
      </h1>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <div className="h-40 flex items-center justify-center">
               <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="h-28 object-contain"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
              </div>

              <h3 className="mt-3 font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-green-600 font-bold mt-1">
                ₹{product.price}
              </p>
              <p className="text-green-600 font-bold mt-1">
                ₹{product.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
