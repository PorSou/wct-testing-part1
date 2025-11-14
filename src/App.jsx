import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Banner";
import CategorySection from "./components/Category";
import ServiceFeatures from "./components/ServiceFeature";

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
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
