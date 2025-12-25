import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/chatbot/ChatBot";
import AOS from "aos";
import "aos/dist/aos.css";

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
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import { allHotDeals } from "./data";

const App = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar with chatbot open button */}
      <Navbar openChatbot={() => setChatbotOpen(true)} />

      {/* Chatbot popup */}
      <ChatBot
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        products={allHotDeals}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <CategorySection />
              <ServiceFeatures />
              <HotDealsSection />
              <PromoBanner />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Home />
              <CategorySection />
              <ServiceFeatures />
              <HotDealsSection />
              <PromoBanner />
            </>
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
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
