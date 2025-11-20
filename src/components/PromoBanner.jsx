import React, { useEffect } from "react";
import { Package } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PromoBanner() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full py-24 px-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-20 -translate-y-20 animate-spin-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32 animate-spin-slow"></div>

      <div className="max-w-3xl mx-auto text-center text-white relative z-10">
        {/* Icon */}
        <Package
          size={60}
          className="mx-auto mb-6 opacity-90 animate-bounce"
          data-aos="zoom-in"
        />

        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
          data-aos="fade-down"
        >
          Exclusive 25% Off First Order!
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl mb-8 opacity-90"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join our newsletter and grab your special discount. Hurry, limited
          time only!
        </p>

        {/* Email Input + Button */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full sm:w-80 px-6 py-3 
              rounded-2xl text-gray-900
              focus:outline-none focus:ring-2 focus:ring-white
              bg-white shadow-lg
              transition-all
            "
          />

          <button
            className="
              bg-white text-purple-600 cursor-pointer
              px-6 py-3 rounded-2xl font-semibold 
              hover:bg-purple-100 hover:text-purple-700 transition-all shadow-lg
            "
          >
            Claim Offer
          </button>
        </div>
      </div>
    </div>
  );
}
