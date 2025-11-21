import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Heart, ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logona.png";
import { setSearchQuery } from "../features/search/searchSlice";
import { logoutUser } from "../features/auth/authSlice";
import { logoutFirebase } from "../features/auth/authService";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorite.items);
  const searchQuery = useSelector((state) => state.search.query);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await logoutFirebase(); // Logout from Firebase
    dispatch(logoutUser()); // Clear Redux
    navigate("/"); // Redirect
    setOpen(false); // Close mobile menu
  };

  const categoriesNav = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/product" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <div className="w-full bg-gradient-to-r sticky top-0 z-50 from-purple-600 via-indigo-600 to-blue-600 text-white shadow-md">
      {/* TOP NAV */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <img src={logo} className="w-6 h-6" alt="logo" />
          </div>
          <h1 className="text-xl font-semibold">ElectroHub</h1>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center w-full max-w-xl bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mx-10">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full bg-transparent outline-none ml-2 text-sm placeholder-white"
          />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={toggleDarkMode} className="w-6 h-6 cursor-pointer">
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>

          {/* Favorites */}
          <Link to="/favorites" className="relative cursor-pointer">
            <Heart className="w-6 h-6 text-white" />
            {favoriteItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {favoriteItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Login/Register or Logout */}
          {user ? (
            <>
              <span className="text-white font-medium">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-red-600 rounded-full hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 bg-white rounded-full text-purple-700 font-semibold hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
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
            {/* Mobile Search */}
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-white" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full bg-transparent outline-none ml-2 text-sm placeholder-white"
              />
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-6 pt-2">
              <button
                onClick={toggleDarkMode}
                className="w-6 h-6 cursor-pointer"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>

              <Link
                to="/favorites"
                className="relative cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <Heart className="w-6 h-6 text-white" />
                {favoriteItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {favoriteItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Login / Logout */}
            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <>
                  <span className="text-white text-center font-medium">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white rounded-lg text-purple-700 font-semibold hover:bg-gray-200 transition text-center"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-center"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-3 pt-4">
              {categoriesNav.map((cat, i) => (
                <NavLink
                  key={i}
                  to={cat.path}
                  className={({ isActive }) =>
                    `text-left transition ${
                      isActive
                        ? "font-semibold bg-clip-text text-transparent bg-blue-800"
                        : "hover:text-blue-300"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* DESKTOP CATEGORY MENU */}
      <div className="hidden md:block bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto flex gap-10 px-6 py-3 text-sm">
          {categoriesNav.map((cat, i) => (
            <NavLink
              key={i}
              to={cat.path}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "font-semibold bg-clip-text text-transparent bg-blue-800"
                    : "hover:text-blue-300"
                }`
              }
            >
              {cat.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
