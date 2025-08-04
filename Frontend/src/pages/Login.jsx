import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Simple validation - accept any valid email format and password length >= 6
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // For demo purposes, accept any valid credentials
    const userData = {
      _id: "123",
      name: email.split('@')[0], // Use email username as name
      email: email,
      role: "customer"
    };
    const token = "mock-jwt-token";
    
    loginUser(userData, token);
    alert("Login successful!");
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Login form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
        <div className="max-w-md w-full">
          <form
            onSubmit={handleLogin}
            className=" space-y-6 p-8 border shadow-sm"
          >
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Rabbit
            </h2>
            <p className="text-2xl text-gray-500 text-center font-bold mb-4">
              {" "}
              Hey There!👋
            </p>
            <p className="text-sm text-gray-600  font-semibold mb-6">
              Enter any valid email and password (min. 6 characters) to login
            </p>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="Password (min. 6 characters)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Sign In
            </button>

            <p className="text-xl text-gray-600 mt-6 text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Background Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={login}
          alt="Login to account"
          className="w-full object-cover h-[750px]"
        />
      </div>
    </div>
  );
};

export default Login;
