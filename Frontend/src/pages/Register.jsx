import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate registration logic
    alert(`Welcome, ${name}! You are registered.`);
    
    // Redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Register form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
        <div className="max-w-md w-full">
          <form
            onSubmit={handleRegister}
            className="space-y-6 p-8 border shadow-sm"
          >
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Rabbit
            </h2>
            <p className="text-2xl text-gray-500 text-center font-bold mb-4">
              👋 Register Now!
            </p>
            <p className="text-sm text-gray-600 font-semibold mb-6">
              Create your account by filling the details below
            </p>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="Your Name"
              />
            </div>

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
              Sign Up
            </button>

            <p className="text-xl text-gray-600 mt-6 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Background Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={register}
          alt="Register illustration"
          className="w-full object-cover h-[750px]"
        />
      </div>
    </div>
  );
};

export default Register;
