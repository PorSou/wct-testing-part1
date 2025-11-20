import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import contactIllustration from "../assets/contact-illustration.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Message sent! We'll get back to you as soon as possible.");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Illustration + Contact Info */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="relative" data-aos="zoom-in">
              <img
                src={contactIllustration}
                alt="Contact us illustration"
                className="w-full max-w-md mx-auto rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div
                className="flex items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-purple-600">electroHub@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="flex items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-purple-600">+855 96 427 9700</p>
                </div>
              </div>

              {/* Office */}
              <div
                className="flex items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Office</h3>
                  <p className="text-gray-500">
                    #40, Street 273, Phnom Penh, Cambodia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-lg"
            data-aos="fade-left"
          >
            <div className="mb-8">
              <h1
                className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2"
                data-aos="fade-down"
              >
                Get in Touch
              </h1>
              <p
                className="text-gray-500"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                Our friendly team would love to hear from you
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div
                className="space-y-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <label htmlFor="fullName" className="text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div
                className="space-y-2"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div
                className="space-y-2"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Contact number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div
                className="space-y-2"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <label htmlFor="message" className="text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Leave us a message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
