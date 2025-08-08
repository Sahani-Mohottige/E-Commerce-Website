import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import ProductGrid from "../components/Products/ProductGrid";
import React from "react";
import axios from "axios";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Extract gender from URL query parameters
        const gender = searchParams.get('gender');
        const category = searchParams.get('category');
        
        // Build query parameters for API call
        const queryParams = new URLSearchParams();
        if (gender) queryParams.append('gender', gender);
        if (category) queryParams.append('category', category);
        if (collection && collection !== 'all') queryParams.append('collection', collection);
        
        console.log('Fetching products with params:', queryParams.toString());
        
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?${queryParams.toString()}`
        );
        
        console.log('Products fetched:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collection, searchParams]);

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
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
