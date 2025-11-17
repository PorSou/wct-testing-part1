import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./components/Banner";
import CategorySection from "./components/Category";
import ServiceFeatures from "./components/ServiceFeature";
import HotDealsSection from "./components/HotDealsSection";
import PromoBanner from "./components/PromoBanner";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ContactForm from "./pages/ContactUs";
import Contact from "./pages/ContactUs";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
              <CategorySection />
              <ServiceFeatures />
              <HotDealsSection />
              <PromoBanner />
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <div>
              <Home />
              <CategorySection />
              <ServiceFeatures />
              <HotDealsSection />
              <PromoBanner />
            </div>
          }
        />
        <Route path="/product" element={<Product />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
