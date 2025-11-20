import React, { useEffect } from "react";
import { categories } from "../data";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CategorySection() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full py-16 mt-10 bg-white">
      {/* Title */}
      <div className="text-center mb-12 px-4" data-aos="fade-up">
        <h2 className="text-4xl font-semibold text-gray-800">
          Shop by <span className="text-purple-700 font-bold">C</span>ategory
        </h2>
        <p className="text-gray-500 mt-2">
          Find exactly what you're looking for
        </p>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid 
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-6
          gap-5 sm:gap-6 lg:gap-8"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center 
              shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100} // stagger effect
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-lg font-medium text-gray-800">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.items} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
