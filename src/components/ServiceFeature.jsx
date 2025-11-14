import React from "react";
import { features } from "../data";

export default function ServiceFeatures() {
  return (
    <div className="w-full py-14 bg-white mt-10">
      <div className="flex flex-wrap justify-center px-4 gap-6">
        {features.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
            style={{ flex: "0 0 25%" }} // This sets width to ~30%
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
  );
}
