import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
} from "../features/auth/authService";
import { setUser } from "../features/auth/authSlice";

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin
        ? await loginWithEmail(email, password)
        : await registerWithEmail(email, password);
      dispatch(setUser(res.user));
      alert(isLogin ? "Login Successful" : "Account Created");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSocialLogin = async (providerFn) => {
    try {
      const res = await providerFn();
      dispatch(setUser(res.user));
      alert("Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin(loginWithGoogle)}
            className="w-full border py-2 rounded-lg"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialLogin(loginWithGithub)}
            className="w-full border py-2 rounded-lg"
          >
            Continue with GitHub
          </button>
          <button
            onClick={() => handleSocialLogin(loginWithFacebook)}
            className="w-full border py-2 rounded-lg"
          >
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
