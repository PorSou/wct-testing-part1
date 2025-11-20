import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorite/favoriteSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function FavoritePage() {
  const favoriteItems = useSelector((state) => state.favorite.items);
  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>

      {favoriteItems.length === 0 ? (
        <p className="text-gray-500">No favorite items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-md p-5 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-contain rounded-md mb-4 bg-gray-100 p-4"
              />

              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-700 font-bold mb-4">${item.price}</p>

              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => dispatch(toggleFavorite(item))}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>

                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
