import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { allHotDeals } from "../data";
import ProductCard from "../components/proudct/ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const searchQuery = useSelector((state) => state.search.query);

  const categories = [
    "ALL",
    "SMARTPHONES",
    "CAMERAS",
    "LAPTOPS",
    "HEADPHONES",
    "ACCESSORIES",
    "TVS",
    "SMARTWATCHS",
  ];

  // Filter by category
  let filteredDeals =
    selectedCategory === "ALL"
      ? [...allHotDeals]
      : allHotDeals.filter((deal) => deal.category === selectedCategory);

  // Filter by search query
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filteredDeals = filteredDeals.filter((deal) =>
      deal.name.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (sortOrder === "asc") filteredDeals.sort((a, b) => a.price - b.price);
  else if (sortOrder === "desc")
    filteredDeals.sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDeals = filteredDeals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle pagination and scroll
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
    AOS.refresh(); // Refresh for dynamic elements
  }, [currentDeals]); // Refresh when products change

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Filters & Sort */}
      <div className="bg-white border-b border-gray-300 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Category Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 cursor-pointer rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                data-aos="zoom-in"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            data-aos="fade-left"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentDeals.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              aos="fade-up"
              aosDelay={index * 100} // Staggered animation
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
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
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
