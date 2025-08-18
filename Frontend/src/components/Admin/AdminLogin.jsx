// src/pages/AdminLogin.jsx

import React, { useState } from "react";

import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:9000/api/admin/login", {
        email,
        password,
      });
      // Save token in localStorage
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Admin logged in successfully!");
      navigate("/admin/users"); // redirect to users page
    } catch (err) {
      console.error(err);
      // Login failed due to backend route not found (404).
      // Check backend server and route configuration for /api/admin/login.
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-800">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
