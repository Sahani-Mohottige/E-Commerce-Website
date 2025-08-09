import { useDispatch, useSelector } from "react-redux";

import MyOrdersPage from "./MyOrdersPage";
import React from "react";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left section - Profile Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-2 border-gray-100 shadow-lg rounded-xl p-8">
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="text-center">
                <h2 className="text-xl font-medium text-green-600 uppercase tracking-wider mb-2">
                  Welcome Back
                </h2>
                <div className="w-12 h-1 bg-green-500 rounded-full mx-auto"></div>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <h1 className="text-2xl font-bold text-gray-800 mt-1">
                    {user?.name || "John Doe"}
                  </h1>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Address
                  </label>
                  <p className="text-gray-800 mt-1 break-all">
                    {user?.email || "john@example.com"}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <div className="pt-6 border-t border-gray-200">
                <button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Right section - Orders Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
