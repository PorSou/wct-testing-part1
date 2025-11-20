import React from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { allHotDeals } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleFavorite } from "../features/favorite/favoriteSlice";

export default function ProductCardDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = allHotDeals.find((p) => p.id === parseInt(id));
  const favoriteItems = useSelector((state) => state.favorite.items);

  if (!product)
    return <p className="text-center text-red-500 py-20">Product not found.</p>;

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  // Default Values
  const ram = product.ram || "8GB";
  const display = product.display || "6.5” FHD";
  const processor = product.processor || "Snapdragon 888";
  const storage = product.storage || "128GB";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-300">
        {/* ------- GRID (IMAGE LEFT, INFO RIGHT) ------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ------------- IMAGE SECTION -------------- */}
          <div className="relative col-span-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[340px] object-cover rounded-xl shadow-md"
            />

            {/* Favorite Button (unchanged) */}
            <button
              onClick={() => dispatch(toggleFavorite(product))}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur p-3 rounded-full shadow cursor-pointer hover:bg-white"
            >
              <Heart
                size={22}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }
              />
            </button>

            {/* Tag (New Arrival, etc.) */}
            {product.tag && (
              <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded">
                {product.tag}
              </span>
            )}
          </div>

          {/* ------------- DETAILS SECTION -------------- */}
          <div className="col-span-2 flex flex-col justify-between">
            {/* Category */}
            <p className="text-sm text-purple-600 font-semibold uppercase mb-1">
              {product.category}
            </p>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2 text-yellow-400">
              ⭐⭐⭐⭐⭐
              <span className="text-gray-600 text-sm">({product.reviews})</span>
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 my-5">
              <p className="text-gray-700 font-medium">
                <span className="text-purple-600 font-semibold">
                  Processor:
                </span>{" "}
                {processor}
              </p>

              <p className="text-gray-700 font-medium">
                <span className="text-purple-600 font-semibold">RAM:</span>{" "}
                {ram}
              </p>

              <p className="text-gray-700 font-medium">
                <span className="text-purple-600 font-semibold">Storage:</span>{" "}
                {storage}
              </p>

              <p className="text-gray-700 font-medium">
                <span className="text-purple-600 font-semibold">Display:</span>{" "}
                {display}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">
              {product.description ||
                "This product offers excellent quality and performance."}
            </p>

            {/* PRICE + BUTTON */}
            <div className="flex items-center justify-between">
              {/* Price */}
              <div>
                <span className="text-4xl font-bold text-purple-600">
                  ${product.price}
                </span>

                {product.oldPrice && (
                  <span className="text-gray-400 line-through ml-3 text-sm">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-purple-600 cursor-pointer text-white px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-purple-700 shadow"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
