import React, { useState } from "react";

import { Link } from "react-router-dom";
import login from "../assets/login.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (email === "test@example.com" && password === "password123") {
      alert("Login successful!");
    } else {
      alert("Invalid credentials");
    }
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
              Enter your username and password to login
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
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Sign In
            </button>

            <p className="text-sm text-gray-600 mt-6 text-center">
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
