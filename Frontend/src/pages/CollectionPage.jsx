import { useEffect, useRef, useState } from "react";

import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import ProductGrid from "../components/Products/ProductGrid";
import React from "react";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=1" }],
        },
        {
          id: 2,
          name: "Product 2",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=2" }],
        },
        {
          id: 3,
          name: "Product 3",
          price: 130,
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          id: 4,
          name: "Product 4",
          price: 140,
          images: [{ url: "https://picsum.photos/500/500?random=4" }],
        },
        {
          id: 5,
          name: "Product 5",
          price: 150,
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          id: 6,
          name: "Product 6",
          price: 160,
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          id: 7,
          name: "Product 7",
          price: 170,
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          id: 8,
          name: "Product 8",
          price: 180,
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Mobile Filter Button */}
      <div className="lg:hidden bg-white shadow-md z-10">
        <button
          onClick={toggleSideBar}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-200 hover:bg-gray-100"
        >
          <FaFilter className="mr-2" />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          ${isSidebarOpen ? "block" : "hidden"} 
          fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white p-6 z-40 overflow-y-auto shadow-lg
          transition-transform duration-300 ease-in-out
          lg:static lg:block lg:translate-x-0 lg:w-1/4
        `}
      >
        <FilterSideBar />
      </div>

      {/* Product Grid */}
      <div className="flex-grow p-4">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
