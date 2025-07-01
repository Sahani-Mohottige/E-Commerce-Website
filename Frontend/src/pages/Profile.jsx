import MyOrdersPage from "./MyOrdersPage";
import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left section - Profile Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              John Doe
            </h1>
            <p className="text-gray-600 mb-4">john@example.com</p>
            <button className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition">
              Logout
            </button>
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
