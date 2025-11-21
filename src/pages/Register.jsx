// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import {
  registerWithEmail,
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
} from "../features/auth/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { Github, Mail } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect query (e.g., "/checkout")
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email registration (no auto-login)
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      alert("Registration successful! Please log in.");
      navigate(`/login${redirect !== "/" ? `?redirect=${redirect}` : ""}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Social login (auto-login)
  const handleProviderLogin = async (provider) => {
    setLoading(true);
    try {
      let res;
      if (provider === "google") res = await loginWithGoogle();
      else if (provider === "github") res = await loginWithGithub();
      else if (provider === "facebook") res = await loginWithFacebook();

      dispatch(setUser(res.user));
      navigate(redirect); // redirect after social login
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center p-10 "
      style={{
        background:
          "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('https://images.unsplash.com/photo-1556764346-5e4c1b4f96f2?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-10">
        {/* Left side */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-bold text-gray-800 mb-4">
            Join Us At
          </div>
          <div className="text-5xl font-bold mb-10">
            <span className="text-blue-600">ELECTRO</span>
            <span className="text-purple-600">HUB</span>
          </div>
          <img
            className="rounded-xl"
            src="https://static.vecteezy.com/system/resources/previews/012/024/324/non_2x/a-person-using-a-smartphone-to-fill-out-a-registration-form-registration-register-fill-in-personal-data-use-the-application-vector.jpg"
            alt="Registration illustration"
          />
        </div>

        {/* Right side */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-full hover:opacity-90 transition"
            >
              {loading ? "Processing..." : "Create Account"}
            </button>
          </form>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <button
              onClick={() => handleProviderLogin("github")}
              className="flex items-center justify-center gap-2 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-3 rounded-lg transition"
            >
              <Github size={20} /> GitHub
            </button>
            <button
              onClick={() => handleProviderLogin("google")}
              className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition"
            >
              <Mail size={20} /> Google
            </button>
            <button
              onClick={() => handleProviderLogin("facebook")}
              className="flex items-center justify-center gap-2 border-2 border-blue-600 text-white bg-blue-600 hover:bg-blue-700 hover:border-blue-700 font-semibold py-3 rounded-lg transition"
            >
              Facebook
            </button>
          </div>

          {/* Link to login */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <a
              href={`/login${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
