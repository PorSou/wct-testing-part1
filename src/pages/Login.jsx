import React, { useState } from "react";
import { Github, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import {
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
} from "../features/auth/authService";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect query (e.g., "/checkout")
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginWithEmail(email, password);
      dispatch(setUser(res.user));
      navigate(redirect); // redirect after login
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      let res;
      if (provider === "google") res = await loginWithGoogle();
      else if (provider === "github") res = await loginWithGithub();
      else if (provider === "facebook") res = await loginWithFacebook();

      dispatch(setUser(res.user));
      navigate(redirect); // redirect after login
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center p-4 mt-10"
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
            Welcome to
          </div>
          <div className="text-5xl font-bold mb-12">
            <span className="text-blue-600">ELECTRO</span>
            <span className="text-purple-600">HUB</span>
          </div>
          <img
            className="rounded-xl"
            src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
            alt=""
          />
        </div>

        {/* Right side */}
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Login
          </h2>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleEmailLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-full transition hover:shadow-lg mb-6"
          >
            Login
          </button>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-3 mb-6">
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

          {/* Register link */}
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
