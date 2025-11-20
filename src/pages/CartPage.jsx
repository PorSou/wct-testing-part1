import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle select/unselect an item
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Select all items
  const selectAll = () => setSelectedItems(cartItems.map((item) => item.id));

  // Clear selection
  const clearSelection = () => setSelectedItems([]);

  // Selected products
  const selectedProducts = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  const subtotal = selectedProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  // Handle proceed
  const handleProceed = () => {
    if (!user || Object.keys(user).length === 0) {
      // Redirect to login if user not logged in, with redirect query
      navigate("/login?redirect=checkout");
    } else if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed.");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="flex gap-4 mb-3">
                <button
                  onClick={selectAll}
                  className="px-3 py-1 border rounded-lg bg-gray-100"
                >
                  Select All
                </button>
                <button
                  onClick={clearSelection}
                  className="px-3 py-1 border rounded-lg bg-gray-100"
                >
                  Clear Selection
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white border rounded-xl p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-md bg-gray-100 p-2"
                    />
                    <div className="min-w-[150px]">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        Size: S | Color: Black
                      </p>
                      <p className="font-bold mt-1 text-sm">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-2 py-1 border rounded-lg"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-2 py-1 border rounded-lg"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3 h-[400px] mt-10 bg-white border rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {selectedItems.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">
                Select items to proceed.
              </p>
            ) : (
              <>
                <p className="text-sm mb-2">
                  Selected Items: {selectedItems.length}
                </p>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </>
            )}

            <button
              onClick={handleProceed}
              className={`w-full py-3 rounded-lg mb-3 transition ${
                selectedItems.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
