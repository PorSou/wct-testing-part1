import React from "react";
import { hotDeals } from "../data";
import { Heart, ArrowRight, TrendingUp, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function HotDealsSection() {
  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-600" />
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                Trending
              </span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Hot Deals This Week
            </h2>
            <p className="text-gray-500 mt-1">
              Don't miss out on these incredible offers
            </p>
          </div>

          <Link
            to="/product"
            className="mt-6 md:mt-0 flex items-center gap-2 bg-white border-gray-200 border px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Products */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4
            gap-8
        "
        >
          {hotDeals.map((product, i) => (
            <div
              key={i}
              className="bg-white cursor-pointer rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover  hover:scale-105  transition-all duration-700 ease-in-out"
                />

                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                )}

                {/* Heart */}
                <button className="absolute top-3 cursor-pointer right-3 bg-white rounded-full p-2 shadow">
                  <Heart size={18} className="text-gray-700" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.category}
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-purple-500">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="text-gray-600 text-sm ml-1">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <span className="text-2xl font-bold text-purple-600">
                    ${product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  className="
                  w-full bg-purple-600 text-white py-3 rounded-xl
                  mt-5 flex items-center justify-center gap-2
                  hover:bg-purple-700 transition cursor-pointer
                "
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
