import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/favorite/favoriteSlice";
import { addToCart } from "../../features/cart/cartSlice";

export default function ProductCard({ product, aos, aosDelay }) {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorite.items);

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden relative"
      data-aos={aos}
      data-aos-delay={aosDelay}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Tag */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
              {product.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-purple-600 font-semibold uppercase mb-1">
            {product.category}
          </p>
          <h3 className="text-base font-bold text-gray-900 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3 text-yellow-400">
            ⭐⭐⭐⭐⭐{" "}
            <span className="text-gray-500 text-xs">({product.reviews})</span>
          </div>

          {/* Price */}
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
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={() => dispatch(toggleFavorite(product))}
        className="absolute top-3 right-3 cursor-pointer bg-white p-2 rounded-full shadow"
      >
        <Heart
          size={18}
          className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}
        />
      </button>

      {/* Add to Cart */}
      <div className="p-4 pt-0">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full bg-purple-600 cursor-pointer text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
