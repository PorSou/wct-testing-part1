import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { items: cartItems } = useSelector((state) => state.cart);

  // Use dummy item if cart is empty for testing
  const items =
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: 1,
            name: "Test Product",
            price: 100,
            quantity: 1,
            image: "https://via.placeholder.com/150",
          },
        ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 10.0 : 0.0;
  const total = subtotal + shipping;

  if (!user) {
    // Protect page if accessed directly
    return <Navigate to="/login?redirect=checkout" />;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Checkout Info:", formData);

    dispatch(clearCart());
    setFormData({
      fullName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    });

    Swal.fire({
      title: "Order Placed ✅",
      text: `Your order of $${total.toFixed(2)} has been placed successfully!`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-gray-900">
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-10 text-3xl font-bold text-center">Checkout</h1>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Shipping Info Form */}
            <div className="p-8 border rounded-lg shadow-sm h-fit lg:col-span-2 bg-white border-gray-200">
              <h2 className="mb-6 text-lg font-semibold">
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-md font-semibold bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="p-6 border rounded-lg shadow-sm flex flex-col justify-between bg-white border-gray-200">
              <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between pb-4 border-b border-gray-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-16 h-20 rounded-md"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <p>Shipping</p>
                <p>${shipping.toFixed(2)}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-2 text-lg font-semibold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
