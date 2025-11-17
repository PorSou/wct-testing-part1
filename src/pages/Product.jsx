import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { allHotDeals } from "../data";

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of products per page

  const categories = ["ALL", "SMARTPHONES", "LAPTOPS", "ACCESSORIES", "TVS"];

  let filteredDeals =
    selectedCategory === "ALL"
      ? [...allHotDeals]
      : allHotDeals.filter((deal) => deal.category === selectedCategory);

  // Sort by price
  if (sortOrder === "asc") {
    filteredDeals.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredDeals.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDeals = filteredDeals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleFavorite = (index) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Filters & Sort */}
      <div className="bg-white border-b border-b-gray-300 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Category Buttons */}
          <div className="flex items-center gap-2  flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1); // reset to first page on category change
                }}
                className={`px-5 py-2 cursor-pointer rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1); // reset page on sort change
              }}
              className="border cursor-pointer border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredDeals.length}</span>{" "}
            products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentDeals.map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {product.tag && (
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    {product.tag}
                  </span>
                )}

                <button
                  onClick={() => toggleFavorite(i)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    size={18}
                    className={`${
                      favorites.includes(i)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    } transition-colors`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1">
                  {product.category}
                </p>

                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx}>⭐</span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-xs ml-1">
                    ({product.reviews})
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-xl font-bold text-purple-600">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through ml-2 text-xs">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                <button className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all group-hover:shadow-lg text-sm">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2  bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded hover:bg-purple-200 cursor-pointer ${
                  currentPage === page
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
