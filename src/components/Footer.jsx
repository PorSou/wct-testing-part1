import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 pt-16 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600">ElectroHub</h2>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Your trusted destination for premium electronics and cutting-edge
            technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-purple-600 cursor-pointer">
              All Products
            </li>
            <li className="hover:text-purple-600 cursor-pointer">
              New Arrivals
            </li>
            <li className="hover:text-purple-600 cursor-pointer">
              Best Sellers
            </li>
            <li className="hover:text-purple-600 cursor-pointer">
              Special Offers
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-purple-600 cursor-pointer">Contact Us</li>
            <li className="hover:text-purple-600 cursor-pointer">
              Shipping Info
            </li>
            <li className="hover:text-purple-600 cursor-pointer">Returns</li>
            <li className="hover:text-purple-600 cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Follow Us
          </h3>
          <p className="text-gray-600 mb-4">
            Stay connected for the latest updates and exclusive deals.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition">
              <Facebook size={18} className="text-purple-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition">
              <Twitter size={18} className="text-purple-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition">
              <Linkedin size={18} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full mt-12 border-t border-gray-300"></div>

      {/* Copyright */}
      <div className="text-center text-gray-600 text-sm mt-6">
        © {new Date().getFullYear()} ElectroHub. All rights reserved.
      </div>
    </footer>
  );
}
