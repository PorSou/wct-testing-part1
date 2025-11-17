import React from "react";
import { Package } from "lucide-react";

export default function PromoBanner() {
  return (
    <div className="w-full py-20 px-4 bg-gradient-to-r from-purple-800 via-purple-400 to-pink-500">
      <div className="max-w-3xl mx-auto text-center text-white">
        {/* Icon */}
        <Package size={60} className="mx-auto mb-6 opacity-90" />

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Get 20% Off Your First Order!
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Sign up today and receive an exclusive discount code. Limited time
          offer for new customers only.
        </p>

        {/* Email Input + Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full sm:w-80 px-5 py-3 
              rounded-xl text-gray-800
              focus:outline-none focus:ring-2 focus:ring-white
              bg-white
            "
          />

          <button
            className="
              bg-white text-purple-600 cursor-pointer
              px-6 py-3 rounded-xl font-medium 
              hover:bg-purple-100 transition
            "
          >
            Get Discount
          </button>
        </div>
      </div>
    </div>
  );
}
