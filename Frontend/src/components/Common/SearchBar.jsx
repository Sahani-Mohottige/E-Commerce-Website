import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300
      ${isOpen ? "fixed top-0 left-0 w-full bg-white h-24 z-50 shadow-lg" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-6 py-2 pr-14 rounded-2xl shadow focus:outline-none w-full placeholder:text-gray-700 placeholder:font-semibold text-gray-900"
            />
            {/* search icon */}
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </div>
          {/* close button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="ml-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-red-600 transition-colors"
          >
            <HiMiniXMark className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-green-600 hover:text-green-800 transition-colors"
        >
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
