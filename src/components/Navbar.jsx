import { useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../assets/logona.png";
import {categoriesNav } from "../data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-md">
      {/* TOP NAV */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl hover:cursor-pointer bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <img src={logo} className="w-6 h-6" alt="logo" />
          </div>
          <h1 className="text-xl font-semibold">ElectroHub</h1>
        </div>

        {/* MIDDLE — SEARCH BAR (hidden on mobile) */}
        <div className="hidden md:flex items-center w-full max-w-xl bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mx-10">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent outline-none ml-2 text-sm placeholder-white"
          />
        </div>

        {/* RIGHT — ICONS */}
        <div className="hidden md:flex items-center gap-6">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-6 h-6 text-white cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>

          <User className="w-6 h-6 text-white cursor-pointer" />
          <Heart className="w-6 h-6 text-white cursor-pointer" />
          <ShoppingCart className="w-6 h-6 text-white cursor-pointer" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden bg-white/10 backdrop-blur-md px-6 pb-4 space-y-4 text-white transition-all duration-500 ease-in-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        {open && (
          <>
            {/* Search */}
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-white" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent outline-none ml-2 text-sm placeholder-white"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 pt-2">
              {/* Dark/Light Toggle in mobile menu */}
              <button
                onClick={toggleDarkMode}
                className="w-6 h-6 text-white cursor-pointer"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>

              <User className="w-6 h-6 cursor-pointer" />
              <Heart className="w-6 h-6 cursor-pointer" />
              <ShoppingCart className="w-6 h-6 cursor-pointer" />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-3 pt-4">
              {categoriesNav.map((cat, i) => (
                <button
                  key={i}
                  className={`text-left hover:text-yellow-300 ${
                    i === 0 ? "font-semibold" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* DESKTOP CATEGORY BAR */}
      <div className="hidden md:block bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto flex gap-10 px-6 py-3 text-sm">
          {categoriesNav.map((cat, i) => (
            <button
              key={i}
              className={`hover:text-yellow-300 transition hover:cursor-pointer ${
                i === 0 ? "font-semibold" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
