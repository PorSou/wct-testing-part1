import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

// Pages
import Home from "./components/Banner";
import CategorySection from "./components/Category";
import ServiceFeatures from "./components/ServiceFeature";
import HotDealsSection from "./components/HotDealsSection";
import PromoBanner from "./components/PromoBanner";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/ContactUs";
import ProductCardDetail from "./pages/ProductCardDetail";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/firebaseConfig";
import { logoutUser, setUser } from "./features/auth/authSlice";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logoutUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home data-aos="fade-up" />
              <CategorySection data-aos="fade-up" />
              <ServiceFeatures data-aos="fade-up" />
              <HotDealsSection data-aos="fade-up" />
              <PromoBanner data-aos="fade-up" />
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <div>
              <Home data-aos="fade-up" />
              <CategorySection data-aos="fade-up" />
              <ServiceFeatures data-aos="fade-up" />
              <HotDealsSection data-aos="fade-up" />
              <PromoBanner data-aos="fade-up" />
            </div>
          }
        />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductCardDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
