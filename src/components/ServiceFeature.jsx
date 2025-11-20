import React, { useEffect } from "react";
import { features } from "../data";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServiceFeatures() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full py-14 bg-white mt-10">
      <div className="container mx-auto px-4">
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-3 
            gap-6
          "
        >
          {features.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={i * 100} // stagger animation
            >
              <div
                className={`${item.bg} w-14 h-14 rounded-xl flex items-center justify-center text-3xl`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>  
  );
}
